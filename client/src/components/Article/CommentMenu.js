import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import threeDots from '../../assets/three-dots.jpeg';
import styled from 'styled-components';
import CommentDialog from './CommentDialog';
import { useAuth0 } from '@auth0/auth0-react';

const CommentMenu = ({ commentId, userId }) => {

    const { user } = useAuth0();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const [openDialog, setOpenDialog] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };

    // returns focus to button when open goes from false to true
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    // deletes comment click based on unique id
    const handleDelete = () => {
        setOpenDialog(true);
    }

    return (
        <Stack
            style={{display: userId !== user?.email && "none"}}
            direction="row"
            spacing={2}
        >
            <CommentDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                commentId={commentId}
            />
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <ThreeDots src={threeDots} alt="Menu button" />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                >
                                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
                </Popper>
            </div>
        </Stack>
    );
}

const ThreeDots = styled.img`
    width: 5px;
`;

export default CommentMenu;