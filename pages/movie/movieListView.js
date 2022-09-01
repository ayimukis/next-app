import * as ReactDOM from "react-dom";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
    Card,
    CardTitle,
    CardImage,
    CardSubtitle,
    CardActions,
} from "@progress/kendo-react-layout";
import { Pager } from "@progress/kendo-react-data-tools";
import {useState} from "react";

const myHeader = () => {
    return (
        <ListViewHeader
            style={{
                color: "rgb(160, 160, 160)",
                fontSize: 14,
            }}
            className="pl-4 pb-2 pt-2"
        >
            인기 영화
        </ListViewHeader>
    );
};

const MyItemRender = (props) => {
    let item = props.dataItem;
    return (
        <Card
            style={{
                padding: "20px 24px",
                border: "none",
                borderBottom: "1px solid rgba(0,0,0,0.12)",
            }}
            orientation="horizontal"
            className="d-flex justify-content-between"
        >
            <div className="k-vbox k-column">
                <div
                    style={{
                        padding: "0 8px",
                        marginRight: "3rem",
                    }}
                >
                    <CardTitle
                        style={{
                            fontSize: 18,
                        }}
                    >
                        {item.original_title}
                    </CardTitle>
                    <CardSubtitle
                        style={{
                            fontSize: 14,
                            marginTop: 0,
                        }}
                    >
                        {item.overview}
                    </CardSubtitle>
                    <CardSubtitle
                        style={{
                            fontSize: 12,
                        }}
                    >
                        {item.release_date}
                    </CardSubtitle>
                </div>
                <CardActions
                    style={{
                        padding: 0,
                    }}
                >
                    <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                        Save for later
                    </button>
                    <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                        Add to favorites
                    </button>
                </CardActions>
            </div>
            <CardImage
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                style={{
                    width: 220,
                    height: 140,
                    maxWidth: 220,
                }}
            />
        </Card>
    );
};

const movieListView = ({results}) => {
    const [page, setPage] = useState({
        skip: 0,
        take: 3,
    });

    const handlePageChange = (e) => {
        setPage({
            skip: e.skip,
            take: e.take,
        });
        console.log(page);

    };

    const { skip, take } = page;


    console.log(results)
    return (
        <div>
            <ListView
                data={results.slice(skip, skip + take)}
                item={MyItemRender}
                style={{
                    width: "100%",
                }}
                header={myHeader}
            />
            <Pager
                skip={skip}
                take={take}
                onPageChange={handlePageChange}
                total={results.length}
            />
        </div>
    );
}

export async function getServerSideProps() {
    const { results } = await (
        await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {
        props: {
            results,
        },
    };
}

export default movieListView