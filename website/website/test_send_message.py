# coding=utf-8
import json

import requests


def generate_sms_captcha(phone):
    params = dict(
        ParamString=json.dumps({"code": "123456"}),  # 短信模板就收的参数
        RecNum=phone,  # 接受短信的手机，多个用英文逗号分隔
        TemplateCode="SMS_53530007",  # 模板code
        SignName="云酒头条" # 签名，用于显示在短信后面，会被【】包裹
    )
    res = requests.get("http://sms.market.alicloudapi.com/singleSendSms",
                       params=params,
                       headers={'Authorization': 'APPCODE 5684032d33284b4097eceec0c29eecac'},
                       timeout=5)
    print res.content
    print res.status_code
    if res.status_code == 200:
        json_res = res.json()
        if json_res['success']:
            return res

if __name__ == '__main__':
    generate_sms_captcha("15011342895")
