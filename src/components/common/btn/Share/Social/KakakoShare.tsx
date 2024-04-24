import { initKakao } from "kakao-js-sdk";
import { useAppSelector } from "../../../../../store/hooks";

export default function KakakoShare({children} : {children : React.ReactNode}){

    const currentUrl = window.location.href;
    const InfoPlace = useAppSelector(state=>state.InfoPlace);

    const onClick = ()=>{

        initKakao(process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY || "").then((isloaded)=>{
            if(isloaded){

                const Kakao = window.Kakao;

                Kakao.Share.sendDefault({
                    objectType : "feed",
                    content : {
                        title : "어댜",
                        description : "어댜에서 좋은 스팟 보고가세용!",
                        imageUrl : InfoPlace.info.image,
                        link : {
                            mobileWebUrl : currentUrl,
                            webUrl : currentUrl
                        }
                    },
                    buttons : [
                        {
                            title : "어댜 보러가기",
                            link : {
                                mobileWebUrl : currentUrl,
                                webUrl : currentUrl
                            }
                        }
                    ]
                })

            }
        })
        .catch(onrejected=>{
            console.log(onrejected);
        })

    }

    return (
        <button onClick={onClick}>{children}</button>
    )

}