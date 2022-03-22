import React, { useState } from "react"
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Select from "../component/Select";
import Button from "../component/Button";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import Movies from "../info/movies.json";

function Top() {
    // form value
    const [time, setTime] = useState({
        id: 0, value: ""
    });
    const [part, setPart] = useState({
        id: 0, value: ""
    });

    // フォームのエラー用
    const [timeErrorMessage, setTimeErrorMessage] = useState("");
    const [partErrorMessage, setPartErrorMessage] = useState("");

    // セレクトで使用するためのオプション値
    const [timeOptions, setTimeOptions] = useState([
        // { id: 1, value: "1分" },
        { id: 2, value: "3分" },
        { id: 3, value: "5分" },
        { id: 4, value: "8分" },
        { id: 5, value: "10分" },
        { id: 6, value: "11分以上" }
    ]);

    const [partOptions, setPartOptions] = useState([
        { id: 1,  value: "首" },
        { id: 2,  value: "肩" },
        { id: 3,  value: "腕" },
        { id: 4,  value: "胸" },
        { id: 5,  value: "お腹" },
        { id: 6,  value: "背中" },
        { id: 7,  value: "腰" },
        { id: 8,  value: "足" },
        { id: 9,  value: "お尻" },
        { id: 10, value: "全身" }
    ]);

    // movie id of youtube
    const [movieId, setMovieId] = useState("");

    // const [historyMovieId, setHistoryMovieId] = useState([]);

    const loadMovieId = () => {
        // selectのIDを取得
        const timeId = time.id;
        const partId = part.id;

        // selectが2つとも選択されていなければエラー。
        const validationResult = checkValidation([
            { id: timeId, setFunction: setTimeErrorMessage },
            { id: partId, setFunction: setPartErrorMessage }
        ]);

        if(!validationResult) return;
        
        // 新しいMovieIDを取得
        const newMovieId = searchMovieId(timeId, partId);

        // 履歴として追加（動画が連続で流れるのを防ぐために使用）
        // setHistoryMovieId(prev => [...prev, newMovieId]);

        // MovieIDを設定する
        setMovieId(newMovieId)
    }

    // 全項目バリデーションに引っ掛からなければtrueを返す
    // なお、引っかかった場合はエラー文字列を設定する
    const checkValidation = (arr) => {
        let isOk = true;

        arr.forEach(item => {
            if(item.id === "" || item.id === 0) {
                item.setFunction("選択してください");
                isOk = false;
            } else {
                item.setFunction("");
            }
        })

        return isOk;
    }

    const searchMovieId = (timeId, partId) => {
        const partIdKey = `part_id${partId}`;
        const timeIdKey = `time_id${timeId}`;

        const movieIdList = Movies.data[partIdKey][timeIdKey];

        // 要素数取得
        const movieIdNum = movieIdList.length;

        if(!movieIdNum) {
            // 動画がない旨のエラー
        }
        
        // 要素数の範囲でランダム値を取得
        const randomNum = Math.floor(Math.random() * movieIdNum);

        // かえす
        return movieIdList[randomNum]
    }

    return (
        <Container className="top">
            <Content>
                <FormBox>
                    <FormItems>
                        <Item>
                            <Select
                                LabelIcon={ AccessTimeIcon }
                                labelTitle="動画時間"
                                optionItems={ timeOptions }
                                selectValue={ time }
                                selectChangeFunction={ setTime }
                                placeHolder="選択してください"
                                error={ timeErrorMessage }
                            />
                        </Item>

                        <Item>
                            <Select
                                LabelIcon={ DirectionsRunIcon }
                                labelTitle="鍛えたい部分"
                                optionItems={ partOptions }
                                selectValue={ part }
                                selectChangeFunction={ setPart }
                                placeHolder="選択してください"
                                error={ partErrorMessage }
                            />
                        </Item>
                    </FormItems>

                    <ButtonBox>
                        <Button
                            onClick={ () => loadMovieId() }
                        >動画を探す</Button>
                    </ButtonBox>
                </FormBox>

                <MovieBox>
                    {movieId !== "" ? (
                        <iframe
                        allowFullScreen
                        height="100%"
                        width="100%"
                        title="movie"
                        src={ `https://www.youtube.com/embed/${ movieId }?loop=1&playlist=${ movieId }&autoplay=1&mute=0&rel=0&modestbranding=1` }
                        ></iframe>
                    ) : (
                        <div>今日もがんばりましょう！</div>
                    )}
                </MovieBox>

            </Content>
        </Container>
    )
}

const Container = styled.div`
    align-items: center;
    background-color: var(--black-2);
    display: flex;
    height: 100%;
    justify-content: center;
`;

const Content = styled.div`
    background-color: var(--white-1);
    border-radius: 20px;
    max-width: 900px;
    min-width: 300px;
    padding: 32px 16px;
    width: 90%;
`;

const FormBox = styled.div`
    margin-bottom: 32px;
`;

const FormItems = styled.div`
    display :flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 16px;
    gap: 0px 16px;
`;

const Item = styled.div `
    flex: 1;
    margin-bottom: 2px;

    & > .select {
        min-width: 250px;
        width: 100%;
    }
`;

const ButtonBox = styled.div`

    & > .button {
        width: 100%;
    }
`;

const MovieBox = styled.div`
    background-color: var(--black-2);
    position: relative;
    width: 100%;
    height: 100%;

    &:before {
        content: "";
        display: block;
        padding-top: calc(9 / 16 * 100%);
    }

    & > iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    & > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        font-size: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white-1);
        font-family: 'Yusei Magic', sans-serif;

        @media(max-width: 600px) {
            font-size: 20px;
        }
    }
`;

export default Top
