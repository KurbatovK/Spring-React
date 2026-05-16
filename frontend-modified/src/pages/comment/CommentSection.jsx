import React, { useState, useEffect } from 'react';
import http from '../../http-common';
import { connect } from 'react-redux';

const CommentSection = ({ taskId, user }) => {
    const [comments, setComments] = useState([]);
    const [newContent, setNewContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Загрузить комментарии к задаче
    const loadComments = () => {
        http.get('/comments/task/' + taskId)
            .then(response => {
                setComments(response.data);
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        if (taskId) {
            loadComments();
        }
    }, [taskId]);

    // Создать комментарий
    const handleCreate = () => {
        if (!newContent.trim()) return;
        setLoading(true);
        http.post('/comments', {
            task_id: parseInt(taskId),
            user_id: user.id,
            content: newContent.trim()
        })
            .then(() => {
                setNewContent('');
                loadComments();
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    };

    // Начать редактирование
    const startEdit = (comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    // Сохранить изменения
    const handleUpdate = (commentId) => {
        if (!editContent.trim()) return;
        http.post('/comments/update/' + commentId, {
            content: editContent.trim()
        })
            .then(() => {
                setEditingId(null);
                loadComments();
            })
            .catch(e => console.log(e));
    };

    // Удалить комментарий
    const handleDelete = (commentId) => {
        if (!window.confirm('Удалить комментарий?')) return;
        http.post('/comments/delete/' + commentId)
            .then(() => loadComments())
            .catch(e => console.log(e));
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const d = new Date(isoString);
        return d.toLocaleString('ru-RU');
    };

    return (
        <div className="mt-4">
            <h5>Комментарии</h5>
            <hr />

            {/* Список комментариев */}
            {comments.length === 0 && (
                <p className="text-muted">Комментариев пока нет.</p>
            )}
            {comments.map(comment => (
                <div key={comment.id} className="card mb-2">
                    <div className="card-body py-2">
                        {editingId === comment.id ? (
                            <div>
                                <textarea
                                    className="form-control mb-2"
                                    rows={2}
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                />
                                <button
                                    className="btn btn-sm btn-success me-2"
                                    onClick={() => handleUpdate(comment.id)}
                                >
                                    Сохранить
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => setEditingId(null)}
                                >
                                    Отмена
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="mb-1">{comment.content}</p>
                                    <small className="text-muted">
                                        Пользователь #{comment.user_id} · {formatDate(comment.timestamp)}
                                    </small>
                                </div>
                                {user && user.id === comment.user_id && (
                                    <div className="ms-2 d-flex gap-1">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => startEdit(comment)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(comment.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Форма добавления нового комментария */}
            {user && (
                <div className="mt-3">
                    <textarea
                        className="form-control mb-2"
                        rows={2}
                        placeholder="Написать комментарий..."
                        value={newContent}
                        onChange={e => setNewContent(e.target.value)}
                    />
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleCreate}
                        disabled={loading || !newContent.trim()}
                    >
                        {loading ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps)(CommentSection);
