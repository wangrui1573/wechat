module.exports = {
    // 基础类型输入框配置
    base: {
        name: {
            title: '文本类型',
            placeholder: '栏位2'
        },
        tel: {
            error: true,
            title: '数字类型',
            inputType: 'number',
            placeholder: '请输入数字'
        },
        address: {
            title: '文本栏位2',
            type: 'textarea',
            placeholder: '请输入文本'
        }
    },
    // 无标题输入框
    notitle: {
        placeholder: '文本textarea',
        componentId: 'textarea:test'
    },
    // 圆角输入框
    radius: {
        totalPrice: {
            right: true,
            mode: 'wrapped',
            title: 'wrapped类型',
            inputType: 'number',
            placeholder: 'number类型'
        },
        excludePrice: {
            right: true,
            error: true,
            mode: 'wrapped',
            title: '不参与优惠金额',
            inputType: 'number',
            placeholder: '输入数字'
        },
        notitle: {
            mode: 'wrapped',
            inputType: 'number',
            placeholder: '请输入数字'
        }
    },
    // Form 中使用输入框
    form: {
        name: {
            placeholder: '表单文本',
            componentId: 'form:test:name'
        },
        tel: {
            name: 'tel',
            inputType: 'tel',
            placeholder: '表单数字',
            componentId: 'form:test:tel'
        }
    }
};
