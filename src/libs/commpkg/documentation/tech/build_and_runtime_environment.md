{{= BackToPackageOverview }}

#Build and Runtime Environment

##Build Environment

* There are no build environment requirements or dependencies.

##Browser Runtime Environment

* Google Chrome: Version 58+
	* Windows 7,8.1, 10 and  MacOS 10.9 and higher.
* Mozilla Firefox: Version 52+
	* Windows 7,8.1, 10 and  MacOS 10.9 and higher.
* Microsoft Internet Explorer: 11 (without audio, without video, without publishing WebCollaboration)
	* Windows 10
* Microsoft Edge: (without audio, without video,  without publishing WebCollaboration)
	* Windows 10
* Apple Safari: 9.3.1 (MacOS only) (without audio, without video,  without publishing WebCollaboration)

The following third party JavaScript libraries are necessary to be included in addition to the SDK libraries AvayaClientServices.min.js, AvayaClientServicesWorker.min.js and AvayaClientServices.Renderer.min.js. The Renderer library is only required for using the collaboration renderer.

| Library         | Version | Notes                                                                                          |
|-----------------|---------|------------------------------------------------------------------------------------------------|
| jQuery          | 3.3.1   | Custom handle could be specified to avoid collisions with existing code.                       |
| eventSource     | 1.0.3   | -                                                                                              |
| unorm           | 1.4.1   | -                                                                                              |
| xmlToJSON       | 1.3     | -                                                                                              |
| Konva           | 2.4.2   | Optional. This is only required when using AvayaClientServices.Renderer.min.js.                |
| JSZip           | 3.2.0   | Optional. This is only required for compressing logs before uploading to MPaaS logging server. |

##Use of Undocumented/Internal APIs

Any APIs visible in the library that are not documented or are marked as for internal Avaya use only should not be used by third party applications. These APIs are internal to the Avaya Client Services library and their use by third party applications could result in unpredictable behavior of the resulting application.

No support will be provided by Avaya related to the use of any internal APIs.