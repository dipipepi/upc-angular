{{= BackToPackageOverview }}

#Security considerations

##Platform specific information

If you are not already, Avaya encourages you to become familiar with the security issues and tools specific to your platform. For JavaScript a good starting point is:

* <a href="https://developer.mozilla.org/en-US/Apps/Security_guidelines" target="_blank">Security tips</a>

This material is by no means exhaustive.  It is provided to highlight that security in general is something that encompasses all aspects of application development and distribution.  There are many resources available to you to help design, implement, and distribute your application to meet your security requirements.

To assist you in integration of Avaya Client SDK into your application and your holistic security strategy, information specific to Client SDK is provided below.

###HTTPS

Hyper Text Transfer Protocl Secure is the secure version of HTTP. S letter on HTTPS stands for "Secure" which basically means that communications between user's browser and the website are encrypted. HTTPS pages usually use one of two secure protocols to encrypt communications:

* SSL (Secure Scokets Layer),
* TLS (Transport Layer Security).

When user requests a HTTPS connection to a webpage, the website sends its SSL certificate to user's browser. Certificate contains public key needed to begin the secure session. All communications sent over HTTP connections are in 'plain text' and it's very easy to retrieve that data for hackers. With HTTPS connection, all communications are securely encrypted. If somebody managed to hijack data, they would not be able to decrypt any of the data which passes between user and the website.

###XSS

XSS is known as cross-site scripting. Attacker can inject code into application and potentially abuse any permission the application is granted. Web browsers use same origin policy which allows to access resources only within same protcol, domain name and port. However it's still possible to inject XSS using inline styles for example. It is mainly aimed for client applications and potentially XSS can do following:

* Steal cookies, capture session of logged in user,
* Dynamically change site content,
* Running keylogger in browser,
* Hosting malware in attacked application (e.g. by using iframe).

To protect users in client applications against XSS following actions should be considered:

* Use .textContent instead of .innerHTML if it's possible,
* Use DOM functions (createElement/setAttribute) or a trusted template system,
* Avoid string concatenation,
* Declare stricter Content Security Policy (CSP) than default one.


###CORS

Same origin policy is used by web browsers to prevent JavaScript code from making requests against a different domain than the one from which it was served. The issue of same origin policy is that it also prevents interactions between a server and clients from a trusted domain. Cross-Origin Resource Sharing (CORS) allows to consume a REST API served from a trusted domain through JavaScript code. This mechanism gives web servers cross-domain access controls, which enable secure cross-domain data transfers. Great explanation of practical CORS use is written on MDN:

* <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS" target="_blank">HTTP access control (CORS)</a>


##Secure Provider Configuration

Many Client SDK Providers use the {{=Config_ServerInfo}}.isSecure flag to indicate when the connection shall be secured. It is a boolean value to determine if security is to be used for the connection to the server.

* {{=Config_AMMConfiguration}} - Messaging service configuration when using Avaya Aura Messaging (AMM)
* {{=Config_ACSConfiguration}} - Messaging and Contact services configuration when using Avaya Aura Device Services (AADS). ACS was an branding acronym used for a prior release of this product.

The following network elements may be accessed in secure or insecure mode. The ServerInfo provided to the Client SDK must match the configuration of the network element.

* {{=Config_UCCPConfiguration}} - Conference service configuration
* {{=Config_WCSConfiguration}} - Web Collaboration service configuration
