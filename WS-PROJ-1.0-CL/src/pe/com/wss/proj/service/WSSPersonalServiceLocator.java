/**
 * WSSPersonalServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package pe.com.wss.proj.service;

public class WSSPersonalServiceLocator extends org.apache.axis.client.Service implements pe.com.wss.proj.service.WSSPersonalService {

    public WSSPersonalServiceLocator() {
    }


    public WSSPersonalServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public WSSPersonalServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for WSSPersonalPort
    private java.lang.String WSSPersonalPort_address = "http://localhost:8090/WS-PROJ-1.0/WSSPersonal";

    public java.lang.String getWSSPersonalPortAddress() {
        return WSSPersonalPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String WSSPersonalPortWSDDServiceName = "WSSPersonalPort";

    public java.lang.String getWSSPersonalPortWSDDServiceName() {
        return WSSPersonalPortWSDDServiceName;
    }

    public void setWSSPersonalPortWSDDServiceName(java.lang.String name) {
        WSSPersonalPortWSDDServiceName = name;
    }

    public pe.com.wss.proj.service.WSSPersonal getWSSPersonalPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(WSSPersonalPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getWSSPersonalPort(endpoint);
    }

    public pe.com.wss.proj.service.WSSPersonal getWSSPersonalPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            pe.com.wss.proj.service.WSSPersonalServiceSoapBindingStub _stub = new pe.com.wss.proj.service.WSSPersonalServiceSoapBindingStub(portAddress, this);
            _stub.setPortName(getWSSPersonalPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setWSSPersonalPortEndpointAddress(java.lang.String address) {
        WSSPersonalPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (pe.com.wss.proj.service.WSSPersonal.class.isAssignableFrom(serviceEndpointInterface)) {
                pe.com.wss.proj.service.WSSPersonalServiceSoapBindingStub _stub = new pe.com.wss.proj.service.WSSPersonalServiceSoapBindingStub(new java.net.URL(WSSPersonalPort_address), this);
                _stub.setPortName(getWSSPersonalPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("WSSPersonalPort".equals(inputPortName)) {
            return getWSSPersonalPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://service.proj.wss.com.pe/", "WSSPersonalService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://service.proj.wss.com.pe/", "WSSPersonalPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("WSSPersonalPort".equals(portName)) {
            setWSSPersonalPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
