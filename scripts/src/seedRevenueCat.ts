import { getUncachableRevenueCatClient } from "./revenueCatClient";
import {
  listProjects,
  createProject,
  listApps,
  createApp,
  listAppPublicApiKeys,
  listProducts,
  createProduct,
  listEntitlements,
  createEntitlement,
  attachProductsToEntitlement,
  listOfferings,
  createOffering,
  updateOffering,
  listPackages,
  createPackages,
  attachProductsToPackage,
  type App,
  type Product,
  type Entitlement,
  type Offering,
  type Package,
  type CreateProductData,
} from "@replit/revenuecat-sdk";

const PROJECT_NAME = "AIs&Ears";
const APP_STORE_BUNDLE_ID = "com.livhappierapps.aisandears";
const PLAY_STORE_PACKAGE_NAME = "com.livhappierapps.aisandears";

// Products — 2 subscriptions + 2 one-time sessions
const PRODUCTS = [
  {
    identifier: "audio_monthly",
    playIdentifier: "audio_monthly:monthly",
    displayName: "Audio Monthly",
    title: "Audio Monthly — Leo hears you 24/7",
    type: "subscription" as const,
    duration: "P1M" as const,
    prices: [{ amount_micros: 5990000, currency: "USD" }],
    entitlement: "audio",
  },
  {
    identifier: "full_monthly",
    playIdentifier: "full_monthly:monthly",
    displayName: "Full Monthly",
    title: "Full Monthly — Leo sees and hears you 24/7",
    type: "subscription" as const,
    duration: "P1M" as const,
    prices: [{ amount_micros: 10990000, currency: "USD" }],
    entitlement: "full",
  },
  {
    identifier: "audio_session",
    playIdentifier: "audio_session",
    displayName: "Audio Session",
    title: "30-min Audio Session",
    type: "non_subscription" as const,
    duration: undefined,
    prices: [{ amount_micros: 2990000, currency: "USD" }],
    entitlement: "audio",
  },
  {
    identifier: "full_session",
    playIdentifier: "full_session",
    displayName: "Full Session",
    title: "30-min Full Session (audio + vision)",
    type: "non_subscription" as const,
    duration: undefined,
    prices: [{ amount_micros: 4990000, currency: "USD" }],
    entitlement: "full",
  },
];

const ENTITLEMENTS = [
  { key: "audio", displayName: "Audio Access" },
  { key: "full", displayName: "Full Access" },
];

type TestStorePricesResponse = { object: string; prices: { amount_micros: number; currency: string }[] };

async function seedRevenueCat() {
  const client = await getUncachableRevenueCatClient();

  // --- Project ---
  const { data: existingProjects, error: lpErr } = await listProjects({ client, query: { limit: 20 } });
  if (lpErr) throw new Error("Failed to list projects");
  let project = existingProjects.items?.find((p) => p.name === PROJECT_NAME);
  if (project) {
    console.log("Project already exists:", project.id);
  } else {
    const { data: newProject, error } = await createProject({ client, body: { name: PROJECT_NAME } });
    if (error) throw new Error("Failed to create project");
    project = newProject;
    console.log("Created project:", project.id);
  }

  // --- Apps ---
  const { data: apps, error: laErr } = await listApps({ client, path: { project_id: project.id }, query: { limit: 20 } });
  if (laErr || !apps) throw new Error("Failed to list apps");

  let testApp = apps.items.find((a) => a.type === "test_store");
  let iosApp = apps.items.find((a) => a.type === "app_store");
  let androidApp = apps.items.find((a) => a.type === "play_store");

  if (!testApp) throw new Error("No test store app found in project");
  console.log("Test store app:", testApp.id);

  if (!iosApp) {
    const { data, error } = await createApp({ client, path: { project_id: project.id }, body: { name: "AIs&Ears iOS", type: "app_store", app_store: { bundle_id: APP_STORE_BUNDLE_ID } } });
    if (error) throw new Error("Failed to create iOS app");
    iosApp = data;
    console.log("Created iOS app:", iosApp.id);
  } else {
    console.log("iOS app exists:", iosApp.id);
  }

  if (!androidApp) {
    const { data, error } = await createApp({ client, path: { project_id: project.id }, body: { name: "AIs&Ears Android", type: "play_store", play_store: { package_name: PLAY_STORE_PACKAGE_NAME } } });
    if (error) throw new Error("Failed to create Android app");
    androidApp = data;
    console.log("Created Android app:", androidApp.id);
  } else {
    console.log("Android app exists:", androidApp.id);
  }

  // --- Products ---
  const { data: existingProducts, error: lprodErr } = await listProducts({ client, path: { project_id: project.id }, query: { limit: 100 } });
  if (lprodErr) throw new Error("Failed to list products");

  const createdProducts: Record<string, { test: Product; ios: Product; android: Product }> = {};

  for (const pd of PRODUCTS) {
    const ensureProduct = async (targetApp: App, storeId: string, isTest: boolean): Promise<Product> => {
      const existing = existingProducts.items?.find((p) => p.store_identifier === storeId && p.app_id === targetApp.id);
      if (existing) {
        console.log(`Product ${storeId} already exists:`, existing.id);
        return existing;
      }
      const body: CreateProductData["body"] = {
        store_identifier: storeId,
        app_id: targetApp.id,
        type: pd.type,
        display_name: pd.displayName,
      };
      if (isTest && pd.type === "subscription") {
        body.subscription = { duration: pd.duration! };
        body.title = pd.title;
      }
      if (isTest && pd.type === "non_subscription") {
        body.title = pd.title;
      }
      const { data: created, error } = await createProduct({ client, path: { project_id: project!.id }, body });
      if (error) throw new Error(`Failed to create product ${storeId}: ${JSON.stringify(error)}`);
      console.log(`Created product ${storeId}:`, created.id);
      return created;
    };

    const testProd = await ensureProduct(testApp, pd.identifier, true);
    const iosProd = await ensureProduct(iosApp, pd.identifier, false);
    const androidProd = await ensureProduct(androidApp, pd.playIdentifier, false);

    // Add test store prices
    if (pd.prices.length > 0) {
      const { error: priceErr } = await client.post<TestStorePricesResponse>({
        url: "/projects/{project_id}/products/{product_id}/test_store_prices",
        path: { project_id: project.id, product_id: testProd.id },
        body: { prices: pd.prices },
      });
      if (priceErr && (priceErr as any)?.type !== "resource_already_exists") {
        console.warn("Price warning:", JSON.stringify(priceErr));
      } else {
        console.log(`Prices set for ${pd.identifier}`);
      }
    }

    createdProducts[pd.identifier] = { test: testProd, ios: iosProd, android: androidProd };
  }

  // --- Entitlements ---
  const { data: existingEntitlements, error: leErr } = await listEntitlements({ client, path: { project_id: project.id }, query: { limit: 20 } });
  if (leErr) throw new Error("Failed to list entitlements");

  const entitlementMap: Record<string, Entitlement> = {};
  for (const ed of ENTITLEMENTS) {
    let ent = existingEntitlements.items?.find((e) => e.lookup_key === ed.key);
    if (!ent) {
      const { data, error } = await createEntitlement({ client, path: { project_id: project.id }, body: { lookup_key: ed.key, display_name: ed.displayName } });
      if (error) throw new Error(`Failed to create entitlement ${ed.key}`);
      ent = data;
      console.log(`Created entitlement ${ed.key}:`, ent.id);
    } else {
      console.log(`Entitlement ${ed.key} exists:`, ent.id);
    }
    entitlementMap[ed.key] = ent;
  }

  // Attach products to entitlements
  for (const pd of PRODUCTS) {
    const ent = entitlementMap[pd.entitlement];
    const prods = createdProducts[pd.identifier];
    const { error } = await attachProductsToEntitlement({
      client,
      path: { project_id: project.id, entitlement_id: ent.id },
      body: { product_ids: [prods.test.id, prods.ios.id, prods.android.id] },
    });
    if (error && (error as any).type !== "unprocessable_entity_error") {
      throw new Error(`Failed to attach ${pd.identifier} to ${pd.entitlement}`);
    }
    console.log(`Attached ${pd.identifier} → ${pd.entitlement}`);
  }

  // --- Offerings ---
  const { data: existingOfferings, error: loErr } = await listOfferings({ client, path: { project_id: project.id }, query: { limit: 20 } });
  if (loErr) throw new Error("Failed to list offerings");

  const offeringDefs = [
    { key: "subscriptions", displayName: "Subscriptions", products: ["audio_monthly", "full_monthly"] },
    { key: "sessions", displayName: "Sessions", products: ["audio_session", "full_session"] },
  ];

  let firstOffering: Offering | undefined;

  for (const od of offeringDefs) {
    let offering = existingOfferings.items?.find((o) => o.lookup_key === od.key);
    if (!offering) {
      const { data, error } = await createOffering({ client, path: { project_id: project.id }, body: { lookup_key: od.key, display_name: od.displayName } });
      if (error) throw new Error(`Failed to create offering ${od.key}`);
      offering = data;
      console.log(`Created offering ${od.key}:`, offering.id);
    } else {
      console.log(`Offering ${od.key} exists:`, offering.id);
    }
    if (!firstOffering) firstOffering = offering;

    // Set subscriptions offering as current
    if (od.key === "subscriptions" && !offering.is_current) {
      const { error } = await updateOffering({ client, path: { project_id: project.id, offering_id: offering.id }, body: { is_current: true } });
      if (error) throw new Error("Failed to set offering as current");
      console.log("Set subscriptions offering as current");
    }

    // Packages
    const { data: existingPackages, error: lpkgErr } = await listPackages({ client, path: { project_id: project.id, offering_id: offering.id }, query: { limit: 20 } });
    if (lpkgErr) throw new Error("Failed to list packages");

    for (const pid of od.products) {
      const pkgKey = pid === "audio_monthly" ? "$rc_monthly" : pid === "full_monthly" ? "$rc_monthly_full" : pid === "audio_session" ? "$rc_lifetime" : "$rc_lifetime_full";
      const pkgName = PRODUCTS.find((p) => p.identifier === pid)!.displayName;

      let pkg = existingPackages.items?.find((p) => p.lookup_key === pkgKey);
      if (!pkg) {
        const { data, error } = await createPackages({ client, path: { project_id: project.id, offering_id: offering.id }, body: { lookup_key: pkgKey, display_name: pkgName } });
        if (error) throw new Error(`Failed to create package ${pkgKey}`);
        pkg = data;
        console.log(`Created package ${pkgKey}:`, pkg.id);
      } else {
        console.log(`Package ${pkgKey} exists:`, pkg.id);
      }

      const prods = createdProducts[pid];
      const { error: apErr } = await attachProductsToPackage({
        client,
        path: { project_id: project.id, package_id: pkg.id },
        body: {
          products: [
            { product_id: prods.test.id, eligibility_criteria: "all" },
            { product_id: prods.ios.id, eligibility_criteria: "all" },
            { product_id: prods.android.id, eligibility_criteria: "all" },
          ],
        },
      });
      if (apErr && !(apErr as any).message?.includes("Cannot attach product")) {
        throw new Error(`Failed to attach products to package ${pkgKey}`);
      }
      console.log(`Attached products to package ${pkgKey}`);
    }
  }

  // --- API Keys ---
  const { data: testKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: testApp.id } });
  const { data: iosKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: iosApp.id } });
  const { data: androidKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: androidApp.id } });

  console.log("\n====================");
  console.log("RevenueCat setup complete!");
  console.log("Project ID:", project.id);
  console.log("Test Store App ID:", testApp.id);
  console.log("Apple App Store App ID:", iosApp.id);
  console.log("Google Play Store App ID:", androidApp.id);
  console.log("Public API Keys - Test Store:", testKeys?.items.map((k) => k.key).join(", ") ?? "N/A");
  console.log("Public API Keys - App Store:", iosKeys?.items.map((k) => k.key).join(", ") ?? "N/A");
  console.log("Public API Keys - Play Store:", androidKeys?.items.map((k) => k.key).join(", ") ?? "N/A");
  console.log("====================\n");
}

seedRevenueCat().catch(console.error);
