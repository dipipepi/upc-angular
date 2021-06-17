{{= BackToPackageOverview }}

#Configuring the Sample App for Avaya Aura

Before using the features in the sample application you will have to acquire configuration information from your administrator to allow the Sample App to connect to the network services you are interested in.

The worksheet below is provided to help you identify what services you will be using and correspondingly what configuration information you should request. It is not necessary to request everything in the table below. If, for example, you would only like to focus on the call service you only need to request the information corresponding to that service.

##Are you using an on-premise Avaya Aura deployment or AvayaLive Collaboratory?

The Avaya Communications Package SDK can be used with either an on-premise Avaya Aura deployment as well as <a href="https://news.avaya.com/avaya-collaboratory" target="_blank">Avaya Collaboratory</a>.

Whether you choose to use an on-premise Avaya Aura deployment or AvayaLive Collaboratory really only comes down to who you talk to as your administrator and where the Avaya servers are located.

##Service Configuration Worksheet

The following worksheet can be used as a template to ensure that you retrieve all necessary information from your administrator for the services you plan to use.

Note: In the certificate column below there are references to a number of different servers. In a typical on-premise deployment it is common for most Avaya Aura services to share one or two Certificate Authorities (CA). Correspondingly your administrator may provide you only one or two CA certificates for all of the services below. Your administrator can use a commercial third party CA like Entrust or Verisign. In this case the CA certificates will already exist in the trust store and no additional certificates will be necessary.



SDK API Interfaces                                                    |              |                                                                 | Information to request from your administrator                                                                                                             |                                                                    |
:-------------------------------------------------------------------- |:------------ |:--------------------------------------------------------------- |:-------------------------------------------------------------------------------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Service**                                                           | **Provider** | **Config Objects**                                              | **Network&nbsp;Parameters**                                                                                                                                | **Certificate&nbsp;Requirements**                                  | **Account&nbsp;Information**
&nbsp;{{=Services_Call_Call}}                                               | SG           | {{=Config_SGConfiguration}}                                     | SG IP/FQDN, port, isSecure on/off                                                                                                                          | Certificate for isSecure connections to SG                         | SG username and password
&nbsp;{{=Services_Conference}}                                              | UCCP         | {{=Config_UCCPConfiguration}}                                   | Particpant code                                                                                                                                            | Certificate for isSecure connections to AAC, Scopia                | N/A
&nbsp;{{=Services_Contacts}}                                                | AADS         | {{=Config_ACSConfiguration}}                                    | AADS IP/FQDN, port, isSecure on/off                                                                                                                        | Certificate for isSecure connections to AADS                       | AADS username and password
&nbsp;{{=Services_Presence}}                                                | SG           | {{=Config_PresenceConfiguration}}                               | SG IP/FQDN, port, isSecure on/off                                                                                                                          | Certificate for isSecure connections to SG                         | SG username and password
&nbsp;{{=Services_Messaging}}                                               | AMM          | {{=Config_AMMConfiguration}}                                    | AMM IP/FQDN, port, isSecure on/off                                                                                                                         | Certificate for isSecure connections to the AMM server             | AMM username and password
&nbsp;{{=Services_Collaboration}}                                           | WCS          | {{=Config_WCSConfiguration}}                                    | N/A                                                                                                                                                        | Certificate for isSecure connections to WCS                        | N/A

