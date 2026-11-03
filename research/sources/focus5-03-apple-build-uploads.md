Source: https://developer.apple.com/documentation/appstoreconnectapi/build-uploads
Title: Build uploads | Apple Developer Documentation
Fetched: 2026-11-03T07:40:40.876Z

* * *

* * *

[Skip Navigation](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads#app-main)

Collection

- [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi)
- [App Store](https://developer.apple.com/documentation/appstoreconnectapi/app-store)
- Build uploads

API Collection

# Build uploads

Read metadata for app builds you upload to App Store Connect.

## [Overview](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#overview)

Use this resource to upload and manage build uploads for your apps. Use the `BUILD_UPLOAD_STATE_UPDATED` webhook event type to get information about build upload status changes. To learn more, see [`WebhookEventType`](https://developer.apple.com/documentation/appstoreconnectapi/webhookeventtype).

The `buildUploads` resource represents the overall concept of the upload, whereas the `buildUploadFiles` resource represents the actual files that you upload. You can also use Xcode or Transporter to upload app binaries. To learn more, see [Transporter](https://apps.apple.com/us/app/transporter/id1450874784).

To read information about your builds after a successful upload, use the [Builds](https://developer.apple.com/documentation/appstoreconnectapi/builds) resource.

## [Topics](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#topics)

### [Managing build uploads](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#Managing-build-uploads)

[`List All Build Uploads for an App`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-apps-_id_-builduploads)

Get a list of all build uploads for a specific app.

[`List all build uploads ids for an app`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-apps-_id_-relationships-builduploads)

Get a list of all build upload Ids for a specific app.

[`Read Build Upload Information`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-builduploads-_id_)

Get details about a specific build upload file for an app.

[`Create a Build Upload`](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-builduploads)

Add a new build upload to an app.

[`Remove a Build Upload`](https://developer.apple.com/documentation/appstoreconnectapi/delete-v1-builduploads-_id_)

Remove a specific build upload for an app.

### [Reading and uploading build files](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#Reading-and-uploading-build-files)

[`Read Build Upload File Information`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-builduploadfiles-_id_)

Get details about a specific build upload file for a build upload.

[`Read build upload file information for a build upload`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-builduploads-_id_-builduploadfiles)

Get build upload file information for a specific build upload.

[`Read the build upload file id for a build upload`](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-builduploads-_id_-relationships-builduploadfiles)

Get the build upload file ID for a specific build upload.

[`Create a Reservation for a Build Upload File`](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-builduploadfiles)

Reserve a build upload file for a specific build upload.

[`Commit a Build Upload File`](https://developer.apple.com/documentation/appstoreconnectapi/patch-v1-builduploadfiles-_id_)

Commit a build upload file to a specific build upload.

### [Objects](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#Objects)

[`object BuildUpload`](https://developer.apple.com/documentation/appstoreconnectapi/buildupload)

A multi-file upload operation for submitting an app build to App Store Connect.

[`object BuildUploadBuildUploadFilesLinkagesResponse`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadbuilduploadfileslinkagesresponse)

A response containing the resource identifiers of upload files associated with a build upload.

[`object BuildUploadCreateRequest`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadcreaterequest)

The request body for initiating a build upload operation.

[`object BuildUploadFile`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadfile)

A single file upload record within a build upload operation, containing the upload URL and checksum for verification.

[`object BuildUploadFileCreateRequest`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadfilecreaterequest)

The request body for creating a file upload record within a build upload operation.

[`object BuildUploadFileResponse`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadfileresponse)

A response containing a single file upload record for a build upload.

[`object BuildUploadFilesResponse`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadfilesresponse)

A response containing a list of file upload records for a build upload operation.

[`object BuildUploadFileUpdateRequest`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadfileupdaterequest)

The request body you use to commit a build upload file.

[`object BuildUploadResponse`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadresponse)

A response containing a single build upload operation record.

[`object BuildUploadsResponse`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadsresponse)

A response containing a list of build upload operations.

[`type BuildUploadState`](https://developer.apple.com/documentation/appstoreconnectapi/builduploadstate)

A string that represents the state of a build upload.

[`object AppBuildUploadsLinkagesResponse`](https://developer.apple.com/documentation/appstoreconnectapi/appbuilduploadslinkagesresponse)

A response containing the resource identifiers of builds associated with an app’s upload operations.

[`object StateDetail`](https://developer.apple.com/documentation/appstoreconnectapi/statedetail)

A resource describing import validation errors, warnings and information.

[`object DeliveryFileUploadOperation`](https://developer.apple.com/documentation/appstoreconnectapi/deliveryfileuploadoperation)

An upload operation descriptor containing the URL, HTTP method, and required headers for uploading a background asset file to Apple’s servers.

## [See also](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#see-also)

### [Builds](https://developer.apple.com/documentation/appstoreconnectapi/build-uploads\#Builds)

[API Reference\\
Builds](https://developer.apple.com/documentation/appstoreconnectapi/builds)

Manage builds for testers and submit builds for review.

[API Reference\\
Build Bundles](https://developer.apple.com/documentation/appstoreconnectapi/build-bundles)

Read metadata for app and App Clip binaries included in a build you upload to App Store Connect.

[API Reference\\
Build Icons](https://developer.apple.com/documentation/appstoreconnectapi/build-icons)

Get icons from your app’s binary that are uploaded to App Store.

[API Reference\\
App Encryption Declarations](https://developer.apple.com/documentation/appstoreconnectapi/app-encryption-declarations)

View, and assign to builds, the declarations about types of encryption used in your app.

Current page is Build uploads