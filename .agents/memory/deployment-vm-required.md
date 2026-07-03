---
name: Deployment must use Reserved VM
description: AIs&Ears API uses WebSockets — autoscale deployment will drop connections
---

# Deployment: Reserved VM Required

## The rule
When publishing AIs&Ears, always select **Reserved VM** (not Autoscale) as the deployment type.

## Why
The API server (`/api/grok-live`) is a WebSocket proxy to xAI. WebSocket connections require a persistent, always-on server. Autoscale deployments idle and drop connections between requests — this would kill active Leo sessions mid-conversation.

## How to apply
In the Replit Publishing dialog → **Advanced** → Deployment Type → choose **Reserved VM**. This cannot be changed after first publish.
