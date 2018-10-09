package com.library.portalmanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.library.portalmanage.common.json.JsonPluginsUtil;
import com.library.portalmanage.http.IRemoteTemplate;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import javax.ws.rs.FormParam;

@RestController
public class BooksManagementSystemController {

    private static Log logger = LogFactory.getLog(BooksManagementSystemController.class);

    @Autowired
    private IRemoteTemplate remoteTemplate;
    @Autowired
    private RestTemplate restTemplate;

    /**
     * 用户管理
     * */
    @RequestMapping(value = "/userManagement", produces = { "application/json; charset=UTF-8" })
    public String userManagement(@FormParam(value = "jsonStr") String jsonStr) {

        JSONObject result = null;
        try{
            logger.info("userManagement request: " + JsonPluginsUtil.beanToJson(jsonStr));

            JSONObject jsonObject = JSONObject.parseObject(jsonStr);
            result = remoteTemplate.remote(jsonStr,jsonObject.getString("method"), JSONObject.class);
        }catch (Exception e){

            logger.error("用户管理失败！！！", e);
            result.put("code","-1");
            return result.toJSONString();
        }

        logger.info("userManagement response :" + result);
        return result.toJSONString();
    }


    /**
     * 图书管理
     * */
    @RequestMapping(value = "/readerManagement", produces = { "application/json; charset=UTF-8" })
    public String readerManagement(@FormParam(value = "jsonStr") String jsonStr) {

        JSONObject result = null;
        try{
            logger.info("readerManagement request: " + JsonPluginsUtil.beanToJson(jsonStr));

            JSONObject jsonObject = JSONObject.parseObject(jsonStr);
            result = remoteTemplate.remote(jsonStr,jsonObject.getString("method"), JSONObject.class);
        }catch (Exception e){

            logger.error("读者管理失败！！！", e);
            result.put("code","-1");
            return result.toJSONString();
        }

        logger.info("readerManagement response :" + result);
        return result.toJSONString();
    }



}
