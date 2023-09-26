import React from "react";

import { Button, Modal, Form, DatePicker, Select, Input } from "antd";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
    const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600}}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
         form={form}
         layout="vertical"
         onFinish={(values) =>{
            onFinish(values , "expense");
            form.resetFields();
         }}
       >
         <Form.Item
         style={{fontWeight:600}}
         label="Name"
         name="name"
         rules={[
            { required: true, message: "Please input the name of transection!" }
         ]}
         >
            <Input type="text" className="custom-input"/>
         </Form.Item>

         <Form.Item
              style={{fontWeight:600}}
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please input expense amount!" }
              ]}
             >
                <Input type="number" className="custom-input"/>
         </Form.Item>
 
         <Form.Item
              style={{fontWeight:600}}
              label="Date"
              name="date"
              rules={[
                { required: true, message: "Please select the income date!" }
              ]}
             >
              <DatePicker formate="YY-MM-DD"  className="custom-input"/>
        </Form.Item>

           <Form.Item
              style={{fontWeight:600}}
              label="Tag"
              name="tag"
              rules={[
                { required: true, message: "Please select a tag!" }
              ]}
             >
              <Select className="select-input-2">
                 <Select.Option value="food">Food</Select.Option>
                 <Select.Option value="travel">Travel</Select.Option>
                 <Select.Option value="education">Education</Select.Option>
                 <Select.Option value="investmengt">Investment</Select.Option>
              </Select>
            
            </Form.Item>    
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn btn-blue">
                    Add Expense
                </Button>
            </Form.Item> 
          </Form>
       </Modal>
  );
}
export default AddExpenseModal;