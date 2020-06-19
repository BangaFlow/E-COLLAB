import React from 'react'
import { Result, Button } from 'antd';

function Authorize() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" href="/app">Back Home</Button>}
        />
    )
}

export default Authorize
