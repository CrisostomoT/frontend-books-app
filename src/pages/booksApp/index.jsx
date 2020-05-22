import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useLocation } from 'react-router-dom';

//material UI components
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';

//styles
import './style.css'

const Book = () => {
    const [authors, setAuthors] = useState([]);
    const location = useLocation();


    //get all authors
    const fetchAuthors = async () => {
        const urlParams = new URLSearchParams(location.search);
        const name = urlParams.get('name');
        const url = name ? `/author/?name=${name}` : "/author";
        const result = await axiosInstance.get(url);
        setAuthors(result.data);
    };

    //submit new author (form)
    const handleSubmit = async (evt) => {

        evt.preventDefault();


        const form = evt.target;

        if (form.checkValidity()) {
            const body = {
                name: form.authorName.value,
                bornYear: form.authorBornYear.value,
                country: form.authorCountry.value,
                singleId: form.authorSingleId.value
            }
            await axiosInstance.post('/author', body)
            fetchAuthors();
        }
    };

    //delete author by id
    const deleteAuthor = id => async () => {
        await axiosInstance.delete(`/author/${id}`);
        fetchAuthors();
    };

    //update author information by id
    const updateAuthor = id => async (evt) => {

        fetchAuthors();
        //
        evt.preventDefault();

        const form = evt.target;

        if (form.checkValidity()) {
            const body = {
                name: form.NewAuthorName.value,
                bornYear: form.NewAuthorBornYear.value,
                country: form.NewAuthorCountry.value
            }
            await axiosInstance.put(`/author/${id}`, body)
            fetchAuthors();
        }
    };


    useEffect(() => {
        fetchAuthors();
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <div>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="formAuthors" >
                        <TextField className="inputAuthor" id="authorName" label="Name" variant="outlined" required />
                        <TextField className="inputAuthor" id="authorCountry" label="Country" variant="outlined" required />
                        <TextField className="inputAuthor" id="authorBornYear" label="Born Year" variant="outlined" required />
                        <TextField className="inputAuthor" id="authorSingleId" helperText="This ID cannot be updated nor removed, and it must be unique to each author" label="ID" variant="outlined" required />
                    </div>
                    <Button variant="contained" type="submit" color="primary">
                        Upload Author
                    </Button>
                </form>
            </div>

            {
                authors && authors.map(({ name, bornYear, country, _id }) => {
                    return (
                        <Card className={classes.root} key={_id}>
                            <CardHeader title={name} subheader={country} />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {bornYear}
                                </Typography>
                            </CardContent>
                            <Button
                                onClick={deleteAuthor(_id)}
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                            >
                                Delete Author
                            </Button>

                            <div>
                                <CardActions disableSpacing>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <div>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <form onSubmit={updateAuthor(_id)}>
                                                <TextField id="NewAuthorName" label="New name" variant="outlined" required />
                                                <TextField id="NewAuthorCountry" label="New country" variant="outlined" required />
                                                <TextField id="NewAuthorBornYear" label="New year borned" variant="outlined" required />
                                                <Button variant="contained" type="submit" color="primary">
                                                    Upload Author
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Collapse>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Book;