import {BetaSchemaForm} from '@ant-design/pro-components';
import React, {useEffect, useRef} from 'react';
import {SizeType} from "@ant-design/pro-form/es/BaseForm";
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  isAdd?:boolean,
  value?: API.ClockInInfo;
  title: string
  open: () => boolean;
  width: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
  onSubmit: (values: API.ClockInInfo) => Promise<void>;
  columns: any[]
  size?: SizeType
};

const ModalForm: React.FC<Props> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const {width, open, onOpenChange, title, value,isAdd, onSubmit, columns, size} = props;
  useEffect(() => {
    // 添加的时候id不存在,可以根据id清空表单
    if (formRef) {
      formRef.current?.setFieldsValue(value);
    }
    if (isAdd){
      formRef.current?.resetFields()
    }
  }, [value]);

  return (
    <>{isAdd ?
      <BetaSchemaForm<API.ClockInInfo>
        width={width}
        title={title}
        size={size}
        initialValues={value}
        open={open()}
        onOpenChange={onOpenChange}
        autoFocusFirstInput
        layoutType={'ModalForm'}
        onFinish={async (value) => {
          onSubmit?.(value);
        }}
        grid={true}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        columns={columns}
      />:<BetaSchemaForm<API.ClockInInfo>
        width={width}
        title={title}
        size={size}
        formRef={formRef}
        open={open()}
        onOpenChange={onOpenChange}
        autoFocusFirstInput
        layoutType={'ModalForm'}
        onFinish={async (value) => {
          onSubmit?.(value);
        }}
        grid={true}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        columns={columns}
      />
    }
    </>
  );
};

export default ModalForm
