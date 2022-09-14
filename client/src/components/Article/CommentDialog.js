import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { Context } from '../../Context';
import styled from 'styled-components';

const CommentDialog = ({ openDialog, setOpenDialog, commentId }) => {

    const { setIsLoading } = useContext(Context);

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {

        setIsLoading(true);

        fetch(`/api/delete-comment/${commentId}`, {
            method: "DELETE",
        }).then(res => res.json())
        .catch(e => {
            console.log("error", e);
        });

        setOpenDialog(false);
        window.location.reload(false);
        setIsLoading(false);
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your comment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                    <DeleteButton onClick={handleDelete} autoFocus>Delete</DeleteButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const CancelButton = styled.button`
    background-color: #ECECEC;
    border: none;
    border-radius: 3px;
    padding: 8px;

    :hover {
        cursor: pointer;
    }
`;

const DeleteButton = styled.button`
    background-color: #d52b36;
    border: none;
    border-radius: 3px;
    padding: 8px;
    color: white;

    :hover {
        cursor: pointer;
    }
`;

export default CommentDialog;