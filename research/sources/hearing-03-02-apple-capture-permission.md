Source: https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29
Title: requestAccess(for:completionHandler:) | Apple Developer Documentation
Fetched: 2026-11-03T07:40:23.756Z

* * *

* * *

[Skip Navigation](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29#app-main)

- [AVFoundation](https://developer.apple.com/documentation/avfoundation)
- [AVCaptureDevice](https://developer.apple.com/documentation/avfoundation/avcapturedevice)
- requestAccess(for:completionHandler:)

Type Method

# requestAccess(for:completionHandler:)

Requests the user’s permission to allow the app to capture media of a particular type.

iOS 7.0+iPadOS 7.0+Mac Catalyst 14.0+macOS 10.14+tvOS 17.0+visionOS 1.0+

```
class func requestAccess(
    for mediaType: AVMediaType,
    completionHandler handler: @escaping @Sendable (Bool) -> Void
)
```

```
class func requestAccess(for mediaType: AVMediaType) async -> Bool
```

## [Parameters](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29\#parameters)

`mediaType`

A media type for which to check the authorization status. The supported media types are [`video`](https://developer.apple.com/documentation/avfoundation/avmediatype/video) and [`audio`](https://developer.apple.com/documentation/avfoundation/avmediatype/audio).

`handler`

A callback the system invokes with a Boolean value that indicates whether the user granted or denied access to your app.

Return control to the main queue or [`MainActor`](https://developer.apple.com/documentation/swift/mainactor) before performing user interface updates.

## [Mentioned in](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29\#mentions)

[Requesting authorization to capture and save media](https://developer.apple.com/documentation/avfoundation/requesting-authorization-to-capture-and-save-media)

## [Discussion](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29\#Discussion)

Capturing media requires explicit permission from the user. An app’s default authorization status is [`AVAuthorizationStatus.notDetermined`](https://developer.apple.com/documentation/avfoundation/avauthorizationstatus/notdetermined), which means the user hasn’t yet granted it permission to capture media. The first time you create an [`AVCaptureDeviceInput`](https://developer.apple.com/documentation/avfoundation/avcapturedeviceinput) object for a media type that requires permission, the system automatically displays an alert to request recording permission. Alternatively, call this method to prompt the user at a time of your choosing. The system saves the user’s selection so that it doesn’t have to prompt the user again. A user can change their authorization status in the Settings app.

Calling this method doesn’t block the thread while the system is prompting the user for access. However, until the grants permission, the system only vends black video frames and silent audio samples.

## [See also](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29\#see-also)

### [Authorizing device access](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29\#Authorizing-device-access)

[`class func authorizationStatus(for: AVMediaType) -> AVAuthorizationStatus`](https://developer.apple.com/documentation/avfoundation/avcapturedevice/authorizationstatus(for:))

Returns an authorization status that indicates whether the user grants the app permission to capture media of a particular type.

[`enum AVAuthorizationStatus`](https://developer.apple.com/documentation/avfoundation/avauthorizationstatus)

Constants that indicate the status of an app’s authorization to capture media.

Current page is requestAccess(for:completionHandler:)