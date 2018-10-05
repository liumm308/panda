package com.library.portalmanage.http;


/**
 * Created by liumm308 on 2018/10/04.
 */
public interface IRemoteTemplate {

    /**
     * 远程调用[long]
     * @param method 方法
     * @param url  nginx
     * @param tClass 类型
     * @param id
     * @return JSONObject
     * */
    public <T> T remote(Long id, String method, String item, String url, Class<T> tClass);
    /**
     * 远程调用[string]
     * @param method 方法
     * @param url  nginx
     * @param tClass 类型
     * @param jsonStr 传入对象(可传入多个参数)
     * @return JSONObject
     * */
    public <T> T remote(String jsonStr, String method, String item, String url, Class<T> tClass);

    /**
     * 远程调用
     * @param method 方法
     * @param url  nginx
     * @param clzz 类型
     * @param obj
     * @return JSONObject
     * */
    public <T> T remote(String method, String item, String url, Class<T> clzz, Object... obj);

    /**
     * 远程调用
     * @param obj 传入对象(可传入多个参数)
     * @return resultInfo
     * */
    public <T> T remote(String url, Class<T> clazz, Object... obj);

    /**
     * 远程调用[string]
     * @param method 方法
     * @param tClass 类型
     * @param jsonStr 传入对象(可传入多个参数)
     * @return JSONObject
     * */
    public <T> T remote(String jsonStr, String method, Class<T> tClass);

}
