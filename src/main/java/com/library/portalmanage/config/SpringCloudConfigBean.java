package com.library.portalmanage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

/**
 * Created by liumm308 on 2018/10/04.
 */
@Configuration
public class SpringCloudConfigBean {

    /**
     * 开启软均衡负载
     * */
    @Bean("restTemplate")
    public RestTemplate restTemplate() {

        //设置延时
        SimpleClientHttpRequestFactory simpleClientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        simpleClientHttpRequestFactory.setConnectTimeout(15000);
        simpleClientHttpRequestFactory.setReadTimeout(15000);
        RestTemplate restTemplate = new RestTemplate(simpleClientHttpRequestFactory);
        //设置编码方式为utf-8
        restTemplate.getMessageConverters().set(1, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        return restTemplate;
    }
}
