const Mock = require('mockjs');

let wait = {
        id: 666,
        invoice_type: '1',
        invoice_content: '',
        room_no: '205,206',
        contact_name: '张三',
        contact_phone: '13388889999',
        remark: '备注',
        title: '测试',
        tax_registry_no: '1247474747474747474',
        address: '上海市杨浦区控江路1690号',
        phone_number: '13111111111',
        bank_name: '工商银行',
        bank_account: 'fortrun',
        hotel_id : '666',
        status: 0,
        create_time: '1501927541049',
        update_time: '1501927541049'
      };

let done = {
        id: 666,
        invoice_type: '1',
        invoice_content: '',
        room_no: '205,206',
        contact_name: '张三',
        contact_phone: '13388889999',
        remark: '备注',
        title: '测试',
        tax_registry_no: '1247474747474747474',
        address: '上海市杨浦区控江路1690号',
        phone_number: '13111111111',
        bank_name: '工商银行',
        bank_account: 'fortrun',
        hotel_id : '666',
        status: 1,
        create_time: '1501927541049',
        update_time: '1501927541049'
      };

let done2 = {
        id: 666,
        invoice_type: '1',
        invoice_content: '',
        room_no: '207,208',
        contact_name: '张三',
        contact_phone: '13388889999',
        remark: '备注',
        title: '测试',
        tax_registry_no: '1247474747474747474',
        address: '上海市杨浦区控江路1690号',
        phone_number: '13111111111',
        bank_name: '工商银行',
        bank_account: 'fortrun',
        hotel_id : '666',
        status: 1,
        create_time: '1301927541049',
        update_time: '1301927541049'
      };


Mock.mock(
    /\/getInvoiceList/,
    function(request){
        let status = request.url.split('?')[1].split('=')[1];
        let re = {
            "errcode": "0",
            "errmsg": "ok"
        }
        switch (status) {
            case '0': 
                re.data = [wait, wait, wait];
                break;
            case '1': 
                re.data = [done, done, done2];
                break;
            default :
        }
        return re;
    }
)

Mock.mock(
    /\/getInvoice/,
    function(request){
        return {
            "errcode": "0",
            "errmsg": "ok",
            "data": done
        };
    }
)
