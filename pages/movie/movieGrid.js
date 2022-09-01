import * as ReactDOM from "react-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import {useState} from "react";

const initialDataState = {
    skip: 0,
    take: 10,
};

const movieGrid = ({results}) => {
    const [page, setPage] = useState(initialDataState);
    console.log(results)
    const pageChange = (event) => {
        setPage(event.page);
        fetch(`http://localhost:3000/api/movies?page={page}`)
    };

    return (
        <div>
            <Grid
                style={{
                    height: "400px",
                }}
                data={results.slice(page.skip, page.take + page.skip)}
                skip={page.skip}
                take={page.take}
                total={results.length}
                pageable={true}
                onPageChange={pageChange}
            >
                <GridColumn field="original_title" title="제목" />
                <GridColumn field="vote_average" title="평점" />
                <GridColumn field="poster_path" title="포스터 경로" />
            </Grid>
        </div>
    );

}

export async function getServerSideProps() {
    const { results } = await (
        await fetch(`http://localhost:3000/api/movies?page=1`)
    ).json();
    return {
        props: {
            results,
        },
    };
}

export default movieGrid