// alap
<Card
    variant="outlined"
    sx={{
        m: 2,
        width: { xs: 240, md: 340 },
        height: { xs: 240, md: 340 },
    }}
    key={shops.id}
>
    <Link to={`/shops/${shops.id}`}>
        <CardActionArea>
            <Grid2 container alignItems="center" justifyContent="center">
                <CardMedia
                    component="img"
                    image={
                        shops.image_path == null
                            ? "./images/template.png"
                            : shops.image_path
                    }
                    sx={{
                        width: { xs: 240, md: 340 },
                        height: {
                            xs: 140,
                            md: 240,
                        },
                    }}
                />
            </Grid2>
            <CardContent>
                <Typography variant="h6">
                    {
                        shops.name /*shops.name.length <= 19
            ? shops.name
            : shops.name.substr(0, 19) +
    "..."*/
                    }
                </Typography>
                <Typography variant="legend">{shops.city}</Typography>
                <br />
                <Rating
                    value={shops.rating == null ? 0 : shops.ratings[0].rating}
                    readOnly
                />
            </CardContent>
        </CardActionArea>
    </Link>
</Card>;
// alap vege

// chatgpt 1
<Card variant="outlined" key={shops.id} sx={{ maxWidth: 345, m: 2 }}>
    <CardMedia
        sx={{ height: 140 }}
        component="img"
        image={
            shops.image_path == null
                ? "./images/template.png"
                : shops.image_path
        }
        title={shops.name}
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {shops.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            {shops.address}
        </Typography>
        <br />
        <Rating name="read-only" value={shops.rating} readOnly />
    </CardContent>
</Card>;
//chatgtp 1 vege

//chatgpt 2
const useStyles = makeStyles({
    card: {
        width: 340,
        height: 340,
        margin: 20,
        [theme.breakpoints.down("xs")]: {
            width: 240,
            height: 240,
        },
    },
    media: {
        height: 140,
        [theme.breakpoints.down("xs")]: {
            height: 240,
        },
    },
});

function ShopCard({ shops }) {
    const classes = useStyles();
    return (
        <Card className={classes.card} variant="outlined">
            <Link to={`/shops/${shops.id}`}>
                <CardActionArea>
                    <Grid container alignItems="center" justify="center">
                        <CardMedia
                            className={classes.media}
                            component="img"
                            image={
                                shops.image_path == null
                                    ? "./images/template.png"
                                    : shops.image_path
                            }
                        />
                    </Grid>
                    <CardContent>
                        <Typography variant="h6">{shops.name}</Typography>
                        <Typography variant="legend">{shops.city}</Typography>
                        <br />
                        <Rating
                            value={
                                shops.rating == null
                                    ? 0
                                    : shops.ratings[0].rating
                            }
                            readOnly
                        />
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}
// chatgtp2 vege
