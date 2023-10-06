import {BetaSchemaForm} from '@ant-design/pro-components';
import React from 'react';
import {SizeType} from "@ant-design/pro-form/es/BaseForm";

export type Props = {
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
  const {width, open, onOpenChange, title, value, onSubmit, columns, size} = props;
  return (
    <>
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
      />
    </>
  );
};

export default ModalForm
