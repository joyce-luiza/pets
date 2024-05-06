import { React } from "react";
import { Form, Input, Button } from "antd";
import "remixicon/fonts/remixicon.css";
import PasswordField from "../../../../components/PasswordField";

export default function ChangePassword({ user }) {
    return (
        <>
            <div>
                <h2>Alterar senha</h2>
                <Form layout="vertical">
                    <PasswordField name={"password"}></PasswordField>
                    <Form.Item
                        label="Confirme a senha:"
                        name="password2"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("A senha não confere")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Confirme a senha"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            Alterar senha
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
