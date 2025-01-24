import React from 'react';
import { Button, Typography } from 'antd';

const PostItem = ({ post, onDelete, onEdit, canEdit, canDelete }) => {
    return (
        <div>
            <Typography.Title level={4}>{post.title}</Typography.Title>
            <Typography.Paragraph>{post.content}</Typography.Paragraph>
            {canEdit && (
                <Button onClick={onEdit} type="primary">
                    Редактировать
                </Button>
            )}
            {canDelete && (
                <Button onClick={onDelete} danger style={{ marginLeft: '10px' }}>
                    Удалить
                </Button>
            )}
        </div>
    );
};

export default PostItem;
