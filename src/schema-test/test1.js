const Ajv = require('ajv');
// const addFormats = require('ajv-formats');
const errors = require('ajv-errors');
// const localize = require('ajv-i18n');

const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

// 开启自定义format
// addFormats(ajv);

// 开启自定义error
errors(ajv);

// 自定义关键字
ajv.addKeyword({
  keyword: 'cusKey',

  // （schema： 当前自定义关键字的值， data：父属性传入的值）
  validate(schema, data) {
    console.log(schema, data);
    return schema;
  },

  error: {
    message: 'cusKey判断出错',
  },

  metaSchema: {
    type: 'boolean',
  },

  // （schema： 当前自定义关键字的值， parentSchema：当前节点）
  // compile(schema, parentSchema) {
  //   console.log(schema, parentSchema);
  //   return () => {};
  // },

  // 手动添加校验类型
  // macro() {
  //   return {
  //     minLength: 10,
  //   };
  // },
});

// 自定义format校验   （format参数名， 校验规则）
ajv.addFormat('test', (data) => {
  return data === 'ha1ha';
});

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test', // 校验类型
      cusKey: false,
      minLength: 4,
    },

    pets: {
      type: 'array',
      items: [{ type: 'string' }, { type: 'number' }],
      maxItems: 2,
      minItems: 2,
    },

    age: {
      type: 'number',
    },
  },

  // 必选项
  required: ['name', 'age'],

  errorMessage: {
    properties: {
      name: '校验不通过',
    },
  },
};

const validate = ajv.compile(schema);

const valid = validate({ name: 'ha1ha', pets: ['jack', 2], age: 11 });

if (!valid) {
  // 中文提示信息
  // localize.zh(validate.errors);

  console.log(JSON.stringify(validate.errors));
}
