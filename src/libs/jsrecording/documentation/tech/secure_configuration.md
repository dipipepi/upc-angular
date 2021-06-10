{{= BackToPackageOverview }}

# Secure Configuration

Many Recording Management Service use the {{=Config_ClientConfig}}.isSecure flag to indicate when the connection shall be secured. It is a boolean value to determine if security is to be used for the connection to the server.

## Platform specific information
If you are not already, Avaya encourages you to become familiar with the security issues and tools specific to your platform. For JavaScript a good starting point is:

* <a href="https://developer.mozilla.org/en-US/Apps/Security_guidelines" target="_blank">Security tips</a>

This material is by no means exhaustive. It is provided to highlight that security in general is something that encompasses all aspects of application development and distribution. There are many resources available to you to help design, implement, and distribute your application to meet your security requirements.

To assist you in integration of Avaya Client SDK into your application and your holistic security strategy, information specific to Recording Management Service Package is provided below.

##HTTPS

Hyper Text Transfer Protocl Secure is the secure version of HTTP. S letter on HTTPS stands for “Secure” which basically means that communications between user’s browser and the website are encrypted. HTTPS pages usually use one of two secure protocols to encrypt communications:

* SSL (Secure Scokets Layer),
* TLS (Transport Layer Security).

When user requests a HTTPS connection to a webpage, the website sends its SSL certificate to user’s browser. Certificate contains public key needed to begin the secure session. All communications sent over HTTP connections are in ’plain text’ and it’s very easy to retrieve that data for hackers. With HTTPS connection, all communications are securely encrypted. If somebody managed to hijack data, they would not be able to decrypt any of the data which passes between user and the website.

##CORS

Same origin policy is used by web browsers to prevent JavaScript code from making requests against a different domain than the one from which it was served. The issue of same origin policy is that it also prevents interactions between a server and clients from a trusted domain. Cross-Origin Resource Sharing (CORS) allows to consume a REST API served from a trusted domain through JavaScript code. This mechanism gives web servers cross-domain access controls, which enable secure cross-domain data transfers. Great explanation of practical CORS use is written on MDN:

* <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS" target="_blank">HTTP access control (CORS)</a>
