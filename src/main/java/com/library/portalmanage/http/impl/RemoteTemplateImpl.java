package com.library.portalmanage.http.impl;

import com.library.portalmanage.http.IRemoteTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * Created by liumm308 on 2018/10/04.
 */
@Service("remoteTemplate")
public class RemoteTemplateImpl implements IRemoteTemplate {

    @Resource
    private RestTemplate restTemplate;

    /**
     * 远程调用[限制接收jsonStr]
     * @param method   请求方法
     * @param item     模块名称
     * @param url      nginx转发
     * @param id     请求数据(可以多个)
     * @return resultInfo
     * */
    public <T> T remote(Long id, String method, String item, String url, Class<T> tClass){

        StringBuffer uri = new StringBuffer();
        uri.append("http://")
                .append(url).append("/")
                .append(item).append("/")
                .append(method);

        T result = restTemplate.postForObject(uri.toString(), id, tClass);

        return result;
    }

    /**
     * 远程调用[限制接收jsonStr]
     * @param method   请求方法
     * @param item     模块名称
     * @param url      nginx转发
     *  @param jsonStr     请求数据(可以多个)
     * @return resultInfo
     * */
    public <T> T remote(String jsonStr, String method, String item, String url, Class<T> tClass){

        StringBuffer uri = new StringBuffer();
        uri.append("http://")
        .append(url).append("/")
        .append(item).append("/")
        .append(method);

        T result = restTemplate.postForObject(uri.toString(), jsonStr, tClass);

        return result;
    }


    /**
     * 远程调用
     * @param method   请求方法
     * @param item     模块名称
     * @param url      nginx转发
     *  @param obj     请求数据(可以多个)
     * @return resultInfo
     * */
    public <T> T remote(String method, String item, String url, Class<T> tClass, Object... obj){

        StringBuffer uri = new StringBuffer();
        uri.append("http://")
                .append(url).append("/")
                .append(item).append("/")
                .append(method);

        if(null == tClass){

            restTemplate.put(uri.toString(), obj);
            return null;
        }

        T result = restTemplate.postForObject(uri.toString(), obj, tClass);

        return result;
    }

    @Override
    public <T> T remote(String url, Class<T> tClass, Object... obj) {

        T result = restTemplate.postForObject(url, obj, tClass);

        return result;
    }

    @Override
    public <T> T remote(String jsonStr, String method, Class<T> tClass) {

        StringBuffer uri = new StringBuffer();
        uri.append("http://")
                .append("localhost:8081").append("/")
                .append(method);

        T result = restTemplate.postForObject(uri.toString(), jsonStr, tClass);

        return result;
    }


}
