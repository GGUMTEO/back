function timeForToday(datetime) {
    const today = new Date();
    const date = new Date(datetime);

    let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

    if (gap < 1) {
        return "방금 전";
    }

    if (gap < 60) {
        return `${gap}분 전`;
    }

    gap = Math.floor(gap / 60);

    if (gap < 24) {
        return `${gap}시간 전`;
    }

    gap = Math.floor(gap / 24);

    if (gap < 31) {
        return `${gap}일 전`;
    }

    gap = Math.floor(gap / 31);

    if (gap < 12) {
        return `${gap}개월 전`;
    }

    gap = Math.floor(gap / 12);

    return `${gap}년 전`;
}

// 나의 작품 목록, 페이징
const myWorkListLayout = document.getElementById("my-work-list");
const myWorkListPaging = document.getElementById("my-work-list-paging");

const showMyWorkList = ({myWorkPosts, myWorkAndFundingPagination}) => {
    let text = ``;
    let pagingText = ``;

    myWorkPosts.forEach((myWorkPost) => {

        text += `
            <div class="list-item">
                <div class="products-list">
                    <div class="flex-box">
                        <div class="products-text">
                            <a href="/video/detail/${myWorkPost.id}"
                                ><p
                                    class="my-products-title"
                                >
                                    ${myWorkPost.postTitle}
                                </p></a
                            >
                            <div
                                class="my-products-info"
                            >
                                <a
                                    ><p
                                        class="smooth my-products-category"
                                    >
                                         ${myWorkPost.genreType}
                                    </p></a
                                >
                                <div
                                    class="divider"
                                ></div>
                                <div class="flex-box">
                                    <img
                                        class="time"
                                        src="/images/member/clock.png"
                                    />
                                    <div
                                        class="timeandcontent smooth"
                                    >
                                        ${timeForToday(myWorkPost.createdDate)}
                                    </div>
                                </div>
                            </div>
                            <a
                                ><p
                                    class="timeandcontent content products-description"
                                >
                                 ${myWorkPost.postContent}
                                </p></a
                            >
                        </div>
                        <div class="products-image">
                            <img src="/text/display?fileName=${myWorkPost.thumbnailFilePath}/t_${myWorkPost.thumbnailFileName}">
                        </div>
                    </div>
                    <div
                        class="flex-box products-author-box"
                    >
                        <div
                            class="author-info flex-box"
                        >
                            <img
                                class="author-image"
                                src=${myWorkPost.profileImgUrl}
                            />
                            <p class="author-name">
                                ${myWorkPost.profileNickName}
                            </p>
                        </div>
                        <div class="flex-box">
                            <div class="btn-wrapper">
                                <button
                                    class="btn btn-action btn-icon-edit-my"
                                    name="toggle_btn"
                                    type="button"
                                >
                                    <p
                                        class="action-tooltip bottom-action edit-my-off"
                                    >
                                        구매한 사람들
                                    </p>
                                    <div
                                        class="edit-my-off"
                                    >
                                        <img
                                            id="my-work-buyer-btn"
                                            class="icon-my-edit-off ${myWorkPost.id}"
                                            src="/images/member/icon-open-btn.png"
                                            width="24px"
                                        >
                                    </div>
                                    <div
                                        class="edit-my-on"
                                        style="
                                            display: none;
                                        "
                                    >
                                        <div
                                            class="icon-my-edit-on"
                                        ></div>
                                    </div>
                                </button>
                            </div>
                            <div class="btn-wrapper">
                                <button
                                    class="btn btn-action icon-delete-read-products"
                                    type="button"
                                >
                                    <a href="/video/modify/${myWorkPost.id}"><img
                                        class="icon-my-delete"
                                        src="/images/member/icon-update-btn.png"
                                        width="24px"
                                    ></a>
                                    <p
                                        class="action-tooltip bottom-action"
                                    >
                                        수정
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="setting-table work-buyer-${myWorkPost.id}" style="
                            border-top: 1px solid
                                rgb(224, 224, 224);
                            display: none;
                        ">
                        <!--내 작품 구매자 테이블-->
                    </div>
                </div>
            </div>
            `;
    });
    myWorkListLayout.innerHTML = text;


    if(myWorkAndFundingPagination.prev){
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }
    for(let i=myWorkAndFundingPagination.startPage; i<=myWorkAndFundingPagination.endPage; i++){
        if(myWorkAndFundingPagination.page === i){
            pagingText += `<li class="page-item"><div class="page-link active">${i}</div></li>`
        }else{
            pagingText += `<li class="page-item"><a href="${i}" class="page-link">${i}</a></li>`
        }
    }

    if(myWorkAndFundingPagination.next) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }

    myWorkListPaging.innerHTML = pagingText;
}

// 나의 작품 - 구매자 목록, 페이징
const showMyWorkBuyerList = ({myWorkBuyers, mySettingTablePagination}) => {

    let text = `<div class="price-member setting-th">
                            <div class="setting-td size-l">
                                이름/이메일
                            </div>
                            <div class="center-text setting-td size-s">
                                금액
                            </div>
                            <div class="center-text setting-td trueorfalse">
                                발송 여부
                            </div>
                        </div>
                       `
    text += `<div class="setting-tr-group" style="border-bottom: solid 1px #e0e0e0; padding-bottom: 0px;">`;

    myWorkBuyers.forEach((myWorkBuyer) => {
        text += `<div class="price-member setting-tr" style="padding-top: 7px">
                    <div class="setting-td with-sub size-l">
                        <div class="membername major-span">
                            ${myWorkBuyer.profileName}
                        </div>
                        <div class="memberemail sub-span">
                            ${myWorkBuyer.profileEmail}
                        </div>
                    </div>
                    <div class="center-text price-member setting-td with-text primary size-s"
                            style="margin-bottom: 35px;">
                        ${myWorkBuyer.workPrice}
                    </div>
                    <div class="center-text setting-td with-btn trueorfalse">
                        <div class="btn-group choice-group">`
        if(myWorkBuyer.workSendStatus === "YES") {
           text += `<div class="btn-choice btn-public active">`
        } else {
            text += `<div class="btn-choice btn-public ${myWorkBuyer.id}">`
        }
                        text += `<input
                                        checked=""
                                        class="radio-value"
                                        name="is_secret_employment"
                                        type="radio"
                                        value="YES"/>보냄
                            </div>`
        if(myWorkBuyer.workSendStatus === "NO") {
            text += `<div class="btn-choice btn-secret active">`
        } else {
            text += `<div class="btn-choice btn-secret ${myWorkBuyer.id}">`
        }
             text +=          `<input
                                        class="radio-value"
                                        name="is_secret_employment"
                                        type="radio"
                                        value="NO"/>안보냄
                            </div>
                        </div>
                    </div>
                    <label
                            class="switch"
                            style="display: none;">
                        <input
                                class="media-checkbox"
                                type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
            `;

    });
    text += `    </div>`;

    text += `<ul class="pagination theme-yozm mypage-page back-or-next">`;

    if(mySettingTablePagination.prev){
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }

    if(mySettingTablePagination.next) {
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }
    text += `    </ul>`;

    return text;
}

// 구매한 작품 목록, 페이징
const myBuyWorkListLayout = document.getElementById("my-buy-work-list");
const myBuyWorkListPaging = document.getElementById("my-buy-work-list-paging");


const showMyBuyWorkList = ({myBuyWorkPosts, myWorkAndFundingPagination}) => {
    let text = ``;
    let pagingText = ``;

    myBuyWorkPosts.forEach((myBuyWorkPost) => {
        text += ` <div class="list-item">
                    <div class="products-list">
                        <div class="flex-box">
                            <div class="products-text">
                                <a href="/video/detail/${myBuyWorkPost.workId}"
                                    ><p
                                        class="my-products-title"
                                    >
                                        ${myBuyWorkPost.postTitle}
                                    </p></a
                                >
                                <div
                                    class="my-products-info"
                                >
                                    <p
                                            class="btn smooth my-products-category"
                                        >
                                           ${myBuyWorkPost.genreType}
                                        </p>
                                    <div
                                        class="divider"
                                    ></div>
                                    <div class="flex-box">
                                        <img
                                            class="time"
                                            src="/images/member/clock.png"
                                        />
                                        <div
                                            class="timeandcontent smooth"
                                        >
                                             ${timeForToday(myBuyWorkPost.createdDate)}
                                        </div>
                                    </div>
                                </div><p
                                        class="timeandcontent content products-description"
                                    >
                                         ${myBuyWorkPost.postContent}
                                    </p>
                            </div>
                            <div class="btn products-image">
                                <img
                                        src="/text/display?fileName=${myBuyWorkPost.thumbnailFilePath}/t_${myBuyWorkPost.thumbnailFileName}"
                                />
                            </div>
                        </div>
                        <div
                            class="flex-box products-author-box"
                        >
                            <div
                                class="author-info flex-box"
                            >
                                <img
                                    class="author-image"
                                    src=${myBuyWorkPost.profileImgUrl}
                                />
                                <p class="author-name">
                                     ${myBuyWorkPost.profileNickName}
                                </p>
                                <div
                                    class="divider"
                                    style="
                                        margin-left: 10px;
                                        margin-right: 10px;
                                    "
                                ></div>
                                <div
                                    id="work-price"
                                    class="timeandcontent smooth" >`
                            if(myBuyWorkPost.workPrice !== null) {
                                        text += myBuyWorkPost.workPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }
                            text += `원
                                </div>
                            </div>
                            <div class="flex-box">
                                <div class="btn-wrapper">
                                    <button
                                        class="btn btn-action icon-delete-read-products"
                                        type="button"
                                    >
                                        <img
                                                id="delete-modal-open-btn"
                                                class="icon-my-delete"
                                                src="/images/member/icon-delete-btn.png"
                                                width="24px"
                                            >
                                        <p
                                            class="action-tooltip bottom-action"
                                        >
                                            구매내역 삭제
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delete-modal" style="display: none;">
                    <div class="modal">
                        <div class="modal-header">
                            <div>
                                <div class="blank"></div>
                                <div class="header-title">
                                    <p>구매내역 삭제</p>
                                </div>
                                <div class="close-btn-wrapper">
                                    <button
                                        class="delete-modal-close-btn close-btn">
                                        <span class="delete-modal-close-btn icon-close"><svg viewBox="0 0 24 24" color="#000000" class="delete-modal-close-btn close"><path class="delete-modal-close-btn" fill-rule="evenodd" clip-rule="evenodd" fill="#000000" d="M4.61321 4.6137C4.96469 4.26223 5.53453 4.26223 5.88601 4.6137L11.9996 10.7273L18.1132 4.6137C18.4647 4.26223 19.0345 4.26223 19.386 4.6137C19.7375 4.96517 19.7375 5.53502 19.386 5.88649L13.2724 12.0001L19.386 18.1137C19.7375 18.4652 19.7375 19.035 19.386 19.3865C19.0345 19.738 18.4647 19.738 18.1132 19.3865L11.9996 13.2729L5.88601 19.3865C5.53453 19.738 4.96469 19.738 4.61321 19.3865C4.26174 19.035 4.26174 18.4652 4.61321 18.1137L10.7268 12.0001L4.61321 5.88649C4.26174 5.53502 4.26174 4.96517 4.61321 4.6137Z"></path></svg></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="modal-content">
                            <form>
                                <div class="delete-question">
                                    <p>정말 삭제하시겠습니까?</p>
                                </div>
                                <div class="submit-btn-wrapper">
                                    <button type="button" class="${myBuyWorkPost.id} btn-test-1">
                                        <span class="${myBuyWorkPost.id} btn-test-2">네, 삭제하겠습니다.</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`

    });

    myBuyWorkListLayout.innerHTML = text;

    if(myWorkAndFundingPagination.prev){
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }
    for(let i=myWorkAndFundingPagination.startPage; i<=myWorkAndFundingPagination.endPage; i++){
        if(myWorkAndFundingPagination.page === i){
            pagingText += `<li class="page-item"><div class="page-link active">${i}</div></li>`
        }else{
            pagingText += `<li class="page-item"><a href="${i}" class="page-link">${i}</a></li>`
        }
    }

    if(myWorkAndFundingPagination.next) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }

    myBuyWorkListPaging.innerHTML = pagingText;
}

// 나의 펀딩 목록, 페이징
const myFundingListLayout = document.getElementById("my-funding-list");
const myFundingListPaging = document.getElementById("my-funding-list-paging");

const showMyFundingList = ({myFundingPosts, myWorkAndFundingPagination}) => {
    let text = ``;
    let pagingText = ``;

    myFundingPosts.forEach((myFundingPost) => {

        text += `
         <div class="list-item my-funding-posts">
            <div class="products-list">
                <div class="flex-box">
                    <div class="products-text">
                        <a
                        ><p
                                class="my-products-title"
                        >
                            ${myFundingPost.postTitle}
                        </p></a
                        >
                        <div
                                class="my-products-info"
                        >
                            <a
                            ><p
                                    class="btn smooth my-products-category"
                            >
                                ${myFundingPost.genreType}
                            </p></a
                            >
                            <div
                                    class="divider"
                            ></div>
                            <div class="flex-box">
                                <img
                                        class="time"
                                        src="/images/member/clock.png"
                                />
                                <div
                                        class="timeandcontent smooth"
                                >
                                   ${timeForToday(myFundingPost.createdDate)}
                                </div>
                            </div>
                        </div>
                        <a
                        ><p
                                class="timeandcontent content products-description"
                        >
                            ${myFundingPost.postContent}
                        </p></a
                        >
                    </div>
                    <div class="btn products-image">
                        <a
                            ><img
                             src="/images/member/thumnail.png"
                        /></a>
                    </div>
                </div>
                <div
                    class="flex-box products-author-box"
                >
                    <div
                        class="author-info flex-box"
                    >
                        <img
                            class="author-image"
                            src="/images/member/member-image.jpg"
                        />
                        <p class="author-name">
                            ${myFundingPost.profileNickname}
                        </p>
                    </div>
                    <div class="flex-box">
                        <div class="btn-wrapper">
                            <button
                                class="btn btn-action btn-icon-edit-my"
                                name="toggle_btn"
                                type="button"
                            >
                                <p
                                    class="action-tooltip bottom-action edit-my-off"
                                >
                                    구매한 사람들
                                </p>
                                <div class="edit-my-off">
                                        <img
                                            id="my-funding-buyer-btn"
                                            class="icon-my-edit-off ${myFundingPost.id}"
                                            src="/images/member/icon-open-btn.png"
                                            width="24px"
                                        >
                                    </div>
                                    <div
                                        class="edit-my-on"
                                        style="
                                            display: none;
                                        "
                                    >
                                        <div
                                            class="icon-my-edit-on"
                                        ></div>
                                    </div>
                                </button>
                            </div>
                            <div class="btn-wrapper">
                                <button
                                    class="btn btn-action icon-delete-read-products"
                                    type="button"
                                >
                                    <a href="/video/funding/modify/${myFundingPost.id}"><img
                                        class="icon-my-delete"
                                        src="/images/member/icon-update-btn.png"
                                        width="24px"
                                    ></a>
                                    <p
                                        class="action-tooltip bottom-action"
                                    >
                                        수정
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="setting-table funding-buyer-${myFundingPost.id}" style="border-top: 1px solid rgb(224, 224, 224); display: none;">
                     </div>    
                </div>
            </div>
            `;
    });
    myFundingListLayout.innerHTML = text;


    if(myWorkAndFundingPagination.prev){
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }
    for(let i=myWorkAndFundingPagination.startPage; i<=myWorkAndFundingPagination.endPage; i++){
        if(myWorkAndFundingPagination.page === i){
            pagingText += `<li class="page-item"><div class="page-link active">${i}</div></li>`
        }else{
            pagingText += `<li class="page-item"><a href="${i}" class="page-link">${i}</a></li>`
        }
    }

    if(myWorkAndFundingPagination.next) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }

    myFundingListPaging.innerHTML = pagingText;
}

// 나의 펀딩 - 구매자 목록, 페이징
const showFundingBuyerList = ({myFundingBuyers, mySettingTablePagination}) => {

    let text = `<div class="setting-th">
                                <div class="setting-td size-l">
                                    이름/이메일
                                </div>
                                <div class="center-text setting-td size-s">
                                    금액
                                </div>
                                <div class="center-text setting-td trueorfalse">
                                    발송 여부
                                </div>
                        </div>
                       `
    text += `<div>
                            <div
                                class="setting-tr-group"
                                style="
                                border-bottom: solid 1px
                                    #e0e0e0;
                                padding-bottom: 0px;
                            "
                    >`;

    myFundingBuyers.forEach((myFundingBuyer) => {
        text += `<div class="price-member setting-tr" style="padding-top: 7px">
                        <div
                                class="setting-td with-sub size-l"
                        >
                            <div
                                    class="membername major-span"
                            >
                                ${myFundingBuyer.profileName}
                            </div>
                            <div
                                    class="memberemail sub-span"
                            >
                                ${myFundingBuyer.profileEmail}
                            </div>
                        </div>
                        <div
                                class="center-text price-member setting-td with-text primary size-s"
                                style="
                                margin-bottom: 35px;
                            "
                        >
                             ${myFundingBuyer.productPrice}원
                        </div>
                        <div
                                class="center-text setting-td with-btn trueorfalse"
                        >
                            <div
                                    class="btn-group choice-group"
                            >
                            `
            if(myFundingBuyer.fundingSendStatus === "YES") {
                        text += `
                                <div
                                        class="btn-choice btn-public active" style="cursor: unset"
                                >`
            }else{
                        text += `
                                <div
                                        class="btn-choice btn-public ${myFundingBuyer.id}"
                                >
                                `
            }
                        text +=  `<input
                                            checked=""
                                            class="radio-value"
                                            name="is_secret_employment"
                                            type="radio"
                                            value="YES"
                                    />
                                    보냄
                                </div>`

            if(myFundingBuyer.fundingSendStatus === "NO") {
                        text += `
                                <div
                                        class="btn-choice btn-secret active"
                                >`
            } else {
                        text += `
                                <div
                                        class="btn-choice btn-secret" style="cursor: unset"
                                >`
            }
                        text += `<input
                                            class="radio-value"
                                            name="is_secret_employment"
                                            type="radio"
                                            value="NO"
                                    />안보냄
                                </div>
                            </div>
                        </div>
                        <label
                                class="switch"
                                style="
                                display: none;
                            "
                        >
                            <input
                                    class="media-checkbox"
                                    type="checkbox"
                            />
                            <span
                                    class="slider round"
                            ></span>
                        </label>
                   </div>
            `;

    });
    text += `    </div>
            </div>`;

    text += `<ul class="pagination theme-yozm mypage-page back-or-next">`;

    if(mySettingTablePagination.prev){
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }

    if(mySettingTablePagination.next) {
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }
    text += `    </ul>`;

    return text;
}

// 결제한 펀딩 목록, 페이징
const myBuyFundingListLayout = document.getElementById("my-buy-funding-list");
const myBuyFundingListPaging = document.getElementById("my-buy-funding-list-paging");


const showMyBuyFundingList = ({myBuyFundingPosts, myWorkAndFundingPagination}) => {
    let text = ``;
    let pagingText = ``;

    myBuyFundingPosts.forEach((myBuyFundingPost) => {
        text += ` <div class="list-item">
                      <div class="products-list">
                            <div class="flex-box">
                                <div class="products-text">
                                    <a
                                        ><p
                                            class="my-products-title"
                                        >
                                            ${myBuyFundingPost.postTitle}
                                        </p></a
                                    >
                                    <div
                                        class="my-products-info"
                                    >
                                        <a
                                            ><p
                                                class="btn smooth my-products-category"
                                            >
                                                ${myBuyFundingPost.genreType}
                                            </p></a
                                        >
                                        <div
                                            class="divider"
                                        ></div>
                                        <div class="flex-box">
                                            <img
                                                class="time"
                                                src="/images/member/clock.png"
                                            />
                                            <div
                                                class="timeandcontent smooth"
                                            >
                                                ${timeForToday(myBuyFundingPost.createdDate)}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        ><p
                                            class="timeandcontent content products-description"
                                        >
                                             ${myBuyFundingPost.postContent}
                                        </p></a
                                    >
                                </div>
                                <div class="btn products-image">
                                    <a
                                        ><img
                                            src="/images/member/thumnail.png"
                                    /></a>
                                </div>
                            </div>
                            <div
                                class="flex-box products-author-box"
                            >
                                <div
                                    class="author-info flex-box"
                                >
                                    <img
                                        class="author-image"
                                        src="/images/member/member-image.jpg"
                                    />
                                    <p class="author-name">
                                        ${myBuyFundingPost.postContent}
                                    </p>
                                    <div
                                        class="divider"
                                        style="
                                            margin-left: 10px;
                                            margin-right: 10px;
                                        "
                                    ></div>
                                    <div
                                        class="timeandcontent smooth"
                                    >
                                        ${myBuyFundingPost.productName}
                                    </div>
                                    <div
                                        class="divider"
                                        style="
                                            margin-left: 10px;
                                            margin-right: 10px;
                                        "
                                    ></div>
                                    <div
                                        class="timeandcontent smooth"
                                    >
                                        ${myBuyFundingPost.productPrice}
                                    </div>
                                </div>
    
                                <div class="flex-box">
                                    <div
                                        class="btn-wrapper"
                                    ></div>
                                    <div class="btn-wrapper">
                                        <button
                                            class="btn btn-action icon-delete-read-products"
                                            type="button"
                                        >
                                            <img
                                                class="icon-my-delete"
                                                src="/images/member/icon-delete-btn.png"
                                                width="24px"
                                            >
                                            <p
                                                class="action-tooltip bottom-action"
                                            >
                                                결제내역 삭제
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>`
    });

    myBuyFundingListLayout.innerHTML = text;

//     콘솔창에 오류가 남. 확인 필요
// if(myBuyFundingPosts[0].id !== null)  {}

    if (myWorkAndFundingPagination.prev) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }
    for (let i = myWorkAndFundingPagination.startPage; i <= myWorkAndFundingPagination.endPage; i++) {
        if (myWorkAndFundingPagination.page === i) {
            pagingText += `<li class="page-item"><div class="page-link active">${i}</div></li>`
        } else {
            pagingText += `<li class="page-item"><a href="${i}" class="page-link">${i}</a></li>`
        }
    }

    if (myWorkAndFundingPagination.next) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }

    myBuyFundingListPaging.innerHTML = pagingText;
}

//************** 모집 ****************

// 나의 모집 목록, 페이징
const myAuditionListLayout = document.getElementById("my-audition-list");
const myAuditionListPaging = document.getElementById("my-audition-list-paging");

const showMyAuditionList = ({myAuditionPosts, myAuditionPagination}) => {
    let text = ``;
    let pagingText = ``;

    myAuditionPosts.forEach((myAuditionPost) => {

        text += `
             <div class="item">
                <div class="item_recruit">
                    <div class="area_job">
                        <h2 class="job_tit">
                            <a
                                target="_blank"
                                title="${myAuditionPost.postTitle}"
                                href=""
                            >
                                <span>
                                    ${myAuditionPost.postTitle} / `
        if (myAuditionPost.auditionField == 1) {
            text += `<b>배우</b> 채용`
        } else if (myAuditionPost.auditionField == 2) {
            text += `<b>스텝</b> 채용`
        } else if (myAuditionPost.auditionField == 3) {
            text += `<b>감독</b> 채용`
        } else if (myAuditionPost.auditionField == 4) {
            text += `<b>기타</b> 채용`
        }
        text += `</span>
                            </a>
                        </h2>
                        <div class="job_date">
                            <span class="date"
                                >~
                                ${myAuditionPost.auditionDeadLine} </span
                            >`
        if (myAuditionPost.auditionStatus === 'YES') {
           text += `<button class="sri_btn_xs">
                                <span
                                    class="sri_btn_immediately"
                                    >모집중</span>
                            </button>`
        }
        else {
            text += `<button class="sri_btn_xs">
                                <span class="btn-complete">
                                    모집완료</span>
                     </button>`
        }

        text +=  `</div>
                        <div
                            class="job_condition"
                        >
                            <span
                                >${myAuditionPost.auditionLocation}</span
                            >`
        if (myAuditionPost.auditionCareer === '') {
            text +=  `<span
                                >·신입</span
                            >`
        } else {
            text += `<span
                                >·경력</span
                            >`
        }
        text +=          `</div>
                        <div class="job_sector">
                            <b
                                >${myAuditionPost.expectedAmount}</b
                            >,
                            <b
                                >${myAuditionPost.auditionPersonnel}</b
                            >
                            <span
                                class="job_day"
                                >등록일
                                ${myAuditionPost.createdDate}</span
                            >
                        </div>
                    </div>
                    <div class="area_corp">
                        <strong
                            class="corp_name"
                            style="
                                margin-top: 43px;
                            "
                        >${myAuditionPost.profileName}
                        </strong>
                        <span
                            class="corp_affiliate"
                            >${myAuditionPost.profileEmail}</span
                        >

                        <div
                            class="btn-wrapper"
                            id="toggleReplyBtn"
                            data-reply="1"
                            style="
                                left: -100px;
                                bottom: 12px;
                            "
                        >
                            <button
                                class="btn btn-action btn-icon-edit-my"
                                name="toggle_btn"
                                type="button"
                                style="
                                    background: white;
                                    border: none;
                                    cursor: unset;
                                "
                            >
                                <p
                                    class="action-tooltip bottom-action edit-my-off"
                                >
                                    지원자
                                    상세보기
                                </p>
                                    <img
                                        id="my-audition-applicant-btn"
                                        class="icon-my-edit-off ${myAuditionPost.id}"
                                        src="/images/member/icon-open-btn.png"
                                        width="24px"
                                    >
                                <div
                                    class="edit-my-on"
                                    style="
                                        display: none;
                                    "
                                >
                                    <div
                                        class="icon-my-edit-on"
                                    ></div>
                                </div>
                            </button>
                            <button
                                    style="
                                    background: none;
                                "
                                    class="btn btn-action icon-delete-read-products"
                                    type="button"
                            >
                                <a href="/audition/video/modify/${myAuditionPost.id}"><img
                                        class="icon-my-delete"
                                        src="/images/member/icon-update-btn.png"
                                        width="24px"
                                ></a>
                                <p
                                        class="action-tooltip bottom-action"
                                >
                                    수정
                                </p>
                            </button>
                        </div>
                    </div>

                    <div
                        class="similar_recruit"
                        style="display: none"
                    ></div>
                </div>
                <!-- js에서 id="replySection1", id="replySection2" 이런 식으로 구분합니다 참고해주세요 -->
                <div
                    class="reply"
                    id="replySection1"
                >
                    <div class="item_recruit">
                        <div
                            class="setting-table audition-applicant-${myAuditionPost.id}"
                            style="
                                border-top: 1px
                                    solid
                                    rgb(
                                        224,
                                        224,
                                        224
                                    );
                                    display: none;
                            "
                        >
<!--                            지원자 목록 & 페이징-->
                        </div>
                    </div>
                </div>
            </div>
            `;
    });
    myAuditionListLayout.innerHTML = text;


    if (myAuditionPagination.prev) {
        pagingText += `<a href="${myAuditionPagination.startPage - 1}" class="btnPrev page_move track_event"
                        page="10" title="이전">이전</a>
        `
    }
    for(let i=myAuditionPagination.startPage; i<=myAuditionPagination.endPage; i++){
        if(myAuditionPagination.page === i){
            pagingText += `<span class="page">${i}</span>`
        }else{
            pagingText += `<a href="${i}" page="${i}" class="page page_move track_event">
                            ${i}</a>`
        }
    }

    if(myAuditionPagination.next) {
        pagingText += `<a href="${myAuditionPagination.endPage + 1}" class="btnNext page_move track_event"
                          page="11" title="다음">다음</a>
        `
    }

    myAuditionListPaging.innerHTML = pagingText;
}

// 나의 모집 목록, 페이징 - 구매자 목록, 페이징
const showMyAuditionApplicantList = ({myAuditionApplicants, mySettingTablePagination}) => {
    console.log("layout-myAuditionApplicants : ", myAuditionApplicants)
    console.log("layout-mySettingTablePagination : ", mySettingTablePagination)

    let text = `<div
                                class="setting-th"
                            >
                                <div
                                    class="setting-td size-l"
                                >
                                    이름/이메일
                                </div>
                                <div
                                    class="center-text setting-td size-s"
                                >
                                    지원분야
                                </div>
                                <div
                                    class="center-text setting-td size-m"
                                >
                                    확인 여부
                                </div>
                       </div>
                       `
    text += `<div class="setting-tr-group" style="border-bottom: solid 1px #e0e0e0; padding-bottom: 0px;">`;

    myAuditionApplicants.forEach((myAuditionApplicant) => {
        text += `<div class="setting-tr" style="padding-top: 7px">
                    <div class="setting-td with-sub size-l">
                        <div class="mb4 major-span">
                           ${myAuditionApplicant.profileName}
                        </div>
                        <a  href="" class="sub-span ${myAuditionApplicant.id}" id="resume-open">
                           이력서 보기
                        </a>
                    </div>`
            if(myAuditionApplicant.auditionField == 1){
                text +=    `<div class="center-text setting-td with-text primary size-s"
                         style="margin-bottom: 35px;">
                         배우`
            }
            if(myAuditionApplicant.auditionField == 2){
                text +=  `<div class="center-text setting-td with-text primary size-s"
                         style="margin-bottom: 35px;">
                         스텝`
            }
            if(myAuditionApplicant.auditionField == 3){
                text +=   `<div class="center-text setting-td with-text primary size-s"
                         style="margin-bottom: 35px;">
                         감독`
            }
            if(myAuditionApplicant.auditionField == 4){
                text +=   `<div class="center-text setting-td with-text primary size-s"
                         style="margin-bottom: 35px;">
                         기타`
            }

        text +=    `</div>
                    <div class="center-text setting-td with-btn size-m">
                        <div class="btn-group choice-group">`

        if(myAuditionApplicant.confirmStatus === "YES") {

            text += `<div class="btn-choice btn-public active">`

        } else {

            text += `<div class="btn-choice btn-public ${myAuditionApplicant.id}">`

        }

        text += `<input checked="" class="radio-value"
                  name="is_secret_employment" type="radio"/>확인</div>`

        if(myAuditionApplicant.confirmStatus === "NO") {

            text += `<div class="btn-choice btn-secret active">`

        } else {

            text += `<div class="btn-choice btn-secret ${myAuditionApplicant.id}">`

        }

            text +=     `<input
                                class="radio-value"
                                name="is_secret_employment"
                                type="radio"
                            />미확인
                        </div>
                    </div>
                </div>
            </div>
            `;

    });
    text += `    </div>`;

    text += `<ul class="pagination theme-yozm mypage-page back-or-next" style="margin-bottom: 20px">`;

    if(mySettingTablePagination.prev){
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }

    if(mySettingTablePagination.next) {
        text += `
            <li class="page-item">
                <a href="${mySettingTablePagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }
    text += `    </ul>`;

    return text;
}

// 내가 신청한 모집 목록, 페이징
const myApplicationAuditionListLayout = document.getElementById("my-application-audition-list");
const myApplicationAuditionListPaging = document.getElementById("my-application-audition-list-paging");


const showMyApplicationAuditionList = ({myApplicationAuditionPosts, myAuditionPagination}) => {
    let text = ``;
    let pagingText = ``;

    myApplicationAuditionPosts.forEach((myApplicationAuditionPost) => {
        text += `<div class="item">
                        <div class="item_recruit">
                            <div class="area_job">
                                <h2 class="job_tit">
                                     <a
                                target="_blank"
                                title="${myApplicationAuditionPost.postTitle}"
                                href=""
                            >
                                <span>
                                    ${myApplicationAuditionPost.postTitle} / `
        if (myApplicationAuditionPost.auditionField == 1) {
            text += `<b>배우</b> 채용`
        } else if (myApplicationAuditionPost.auditionField == 2) {
            text += `<b>스텝</b> 채용`
        } else if (myApplicationAuditionPost.auditionField == 3) {
            text += `<b>감독</b> 채용`
        } else if (myApplicationAuditionPost.auditionField == 4) {
            text += `<b>기타</b> 채용`
        }
        text += `</span>
                            </a>
                        </h2>
                        <div class="job_date">
                            <span class="date"
                                >~
                                ${myApplicationAuditionPost.auditionDeadLine} </span
                            >`
        if (myApplicationAuditionPost.auditionStatus === 'YES') {
            text += `<button class="sri_btn_xs">
                                <span
                                    class="sri_btn_immediately"
                                    >모집중</span>
                            </button>`
        }
        else {
            text += `<button class="sri_btn_xs">
                                <span class="btn-complete">
                                    모집완료</span>
                     </button>`
        }

        text +=  `</div>
                        <div
                            class="job_condition"
                        >
                            <span
                                >${myApplicationAuditionPost.auditionLocation}</span
                            >`
        if (myApplicationAuditionPost.auditionCareer === '') {
            text +=  `<span
                                >·신입</span
                            >`
        } else {
            text += `<span
                                >·경력</span
                            >`
        }
        text +=          `</div>
                        <div class="job_sector">
                            <b
                                >${myApplicationAuditionPost.expectedAmount}</b
                            >,
                            <b
                                >${myApplicationAuditionPost.auditionPersonnel}</b
                            >
                            <span
                                class="job_day"
                                >등록일
                                ${myApplicationAuditionPost.createdDate}</span
                            >
                        </div>
                    </div>
                    <div class="area_corp">
                        <strong
                            class="corp_name"
                        >${myApplicationAuditionPost.profileName}
                        </strong>
                        <span
                            class="corp_affiliate"
                            >${myApplicationAuditionPost.profileEmail}</span
                        >
                            </div>

                            <div
                                class="similar_recruit"
                                style="display: none"
                            ></div>
                        </div>
                    </div>`
    });

    myApplicationAuditionListLayout.innerHTML = text;

    if (myAuditionPagination.prev) {
        pagingText += `<a href="${myAuditionPagination.startPage - 1}" class="btnPrev page_move track_event"
                        page="10" title="이전">이전</a>
        `
    }
    for(let i=myAuditionPagination.startPage; i<=myAuditionPagination.endPage; i++){
        if(myAuditionPagination.page === i){
            pagingText += `<span class="page">${i}</span>`
        }else{
            pagingText += `<a href="${i}" page="${i}" class="page page_move track_event">
                            ${i}</a>`
        }
    }

    if(myAuditionPagination.next) {
        pagingText += `<a href="${myAuditionPagination.endPage + 1}" class="btnNext page_move track_event"
                          page="11" title="다음">다음</a>
        `
    }

    myApplicationAuditionListPaging.innerHTML = pagingText;
}

// 문의내역, 페이징
const myInquiryHistoryListLayout = document.getElementById("my-inquiry-history-list");
const myInquiryHistoryListPaging = document.getElementById("my-inquiry-history-list-paging");


const showMyInquiryHistoryList = ({myInquiryHistories, myWorkAndFundingPagination}) => {
let text = ``;
let pagingText = ``;

    myInquiryHistories.forEach((myInquiryHistory) => {
        text += `<div class="list-item">
            <div class="inquiry-list">
                <div class="flex-box">
                    <div class="inquiry-text">
                        <a
                            ><p
                                class="my-inquiry-title"
                            >
                                ${myInquiryHistory.postTitle}
                            </p></a
                        >
                        <div
                            class="my-inquiry-info"
                        >
                            <div class="flex-box">
                                <img
                                    class="time"
                                    src="/images/member/clock.png"
                                />
                                <div
                                    class="timecontent-font"
                                >
                                     ${timeForToday(myInquiryHistory.postCreatedDate)}
                                </div>
                            </div>
                        </div>
                        <a
                            ><p
                                class="timecontent-font content inquiry-description"
                            >
                                 ${myInquiryHistory.postContent}
                            </p></a
                        >
                    </div>
                </div>
                <div
                    class="flex-box inquiry-author-box"
                >
                    <div
                        class="author-info flex-box"
                    >
                        <img
                            class="author-image"
                            src="/images/member/member-image.jpg"
                        />
                        <p class="author-name">
                            ${myInquiryHistory.profileNickname}
                        </p>
                    </div>
                    <div
                        class="flex-box"
                        style="margin-left: 370px"
                    >
                        <div class="btn-wrapper">
                            <button
                                class="btn btn-action btn-icon-edit-my"
                                name="toggle_btn"
                                type="button"
                                style="
                                    background-color: white;
                                "
                            >
                                <p
                                    class="action-tooltip bottom-action edit-my-off"
                                >
                                    관리자 답변 보기
                                </p>
                                <div
                                    class="edit-my-off"
                                >
                                    <div
                                        id="admin-answer-btn"
                                        class="icon-my-edit-off ${myInquiryHistory.postId}"
                                    ></div>
                                </div>
                                <div
                                    class="edit-my-on"
                                    style="
                                        display: none;
                                    "
                                >
                                    <div
                                        class="icon-my-edit-on"
                                    ></div>
                                </div>
                            </button>
                        </div>
    
                    </div>
                </div>
                <div
                    class="setting-table inquiry-${myInquiryHistory.postId}""
                    style="
                        border-top: 1px solid
                            rgb(224, 224, 224);
                        display: none;
                    " 
                >
<!--답변 테이블 -->
                </div>
            </div>
        </div>`;
    });
    myInquiryHistoryListLayout.innerHTML = text;


    if(myWorkAndFundingPagination.prev){
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.startPage - 1}" class="page-link back"></a>
            </li>
        `
    }
    for(let i=myWorkAndFundingPagination.startPage; i<=myWorkAndFundingPagination.endPage; i++){
        if(myWorkAndFundingPagination.page === i){
            pagingText += `<li class="page-item"><div class="page-link active">${i}</div></li>`
        }else{
            pagingText += `<li class="page-item"><a href="${i}" class="page-link">${i}</a></li>`
        }
    }

    if(myWorkAndFundingPagination.next) {
        pagingText += `
            <li class="page-item">
                <a href="${myWorkAndFundingPagination.endPage + 1}" class="page-link next"></a>
            </li>
        `
    }
    myInquiryHistoryListPaging.innerHTML = pagingText;
}

// 내 문의 내역 관리자 답변
const showAdminAnswer = (adminAnswer) => {
    let text =``;

        text =  `<div class="setting-th">
                <div
                    class="setting-td manager"
                >
                    관리자 답변
                </div>
            </div>
            <div
                class="setting-tr-group"
                style="
                    border-bottom: solid 1px
                        #e0e0e0;
                    padding-bottom: 0px;
                "
            >
                <div
                    class="setting-tr"
                    style="padding-top: 7px"
                >
                    <div
                        class="setting-td with-sub manager"
                        style="width: 700px"
                    >`
            if(adminAnswer.inquiryStatus === 'YES')  {
               text +=  `<div class="sub-span">
                            ${adminAnswer.adminAnswerContent}
                        </div>`
            }
            else {

                text +=  `<div class="sub-span">
                            아직 미답변 상태입니다.
                        </div>`

            }
    text +=    `</div>
                </div>
            </div>`

    return text;
}

// 내 정보
const myProfileLayout = document.getElementById("my-profile");

const showMyProfile = (myProfile) => {
    let text = ``;

    text = `<form class="form-horizontal has-validation-callback">
                <div class="original-profileName" style="display: none">${myProfile.profileName}</div>
                <div class="original-profileNickName" style="display: none">${myProfile.profileNickName}</div>
                <div class="original-profileGender" style="display: none">${myProfile.profileGender}</div>
                <div class="original-profileAge" style="display: none">${myProfile.profileAge}</div>
                <div class="original-profileEtc" style="display: none">${myProfile.profileEtc}</div>
                <div class="form-group">
                    <label class="control-label required" id="full_name_label"><span></span>이름</label>
                    <div class="control-wrapper">
                        <input class="form-control" id="profileName" placeholder="이름을 입력해 주세요." name="profileName" type="text" value="${myProfile.profileName}">
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            이 항목을 채워주십시오.
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label required" id="full_nickname_label"><span></span> 닉네임</label>
                    <div class="control-wrapper">
                        <input class="form-control" id="profileNickName"
                               placeholder="사용할 닉네임을 입력해주세요." name="profileNickName" type="text" value="${myProfile.profileNickName}">
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            이 항목을 채워주십시오.
                        </div>
                    </div>
                </div>
                <div class="form-group" style="margin-top: -5px">
                    <label class="control-label" for="gender">성별</label>
                    <div class="control-wrapper">
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            이 항목을 채워주십시오.
                        </div>
                    </div>
                    <div class="control-wrapper">
                        <ul id="profileGender" class="list-unstyled" style="margin-bottom: 0">
                            <li>
                                <label class="radio-inline" for="gender_1">`
    if(myProfile.profileGender === '남성'){
    text +=    `<input data-exception="yes" id="gender-1" name="profileGender" type="radio" value="남성" checked="checked">`
    }
    else {
        text += `<input data-exception="yes" id="gender-1" name="profileGender" type="radio" value="남성">`
    }
                                    text += `남성
                                </label>
                            </li>
                            <li>
                                <label class="radio-inline" for="gender_2">`
    if(myProfile.profileGender === '여성') {
        text += `<input data-exception="yes" id="gender-2" name="profileGender" type="radio" value="여성" checked="checked">`
    }
    else {
        text += `<input data-exception="yes" id="gender-2" name="profileGender" type="radio" value="여성">`
    }
                                    text += `여성
                                </label>
                            </li>
                        </ul>
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            이 항목을 채워주십시오.
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label" for="date_of_birth" id="date_of_birth_label">나이</label>
                    <div class="control-wrapper">
                        <input class="form-control" id="profileAge" name="profileAge" placeholder="만 나이를 입력해주세요." type="text" value="${myProfile.profileAge}">
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            이 항목을 채워주십시오.
                        </div>
                    </div>
                </div>
                <div class="form-group etc">
                    <label class="control-label">추가 작성사항</label>
                    <div class="control-wrapper">
                        <textarea class="form-control form-textarea" id="profileEtc" placeholder="간단한 자기소개를 입력해주세요." name="profileEtc" value="${myProfile.profileEtc}" style="height: 340px"></textarea>
                        <div class="error-message">
                            <i class="fa fa-exclamation-circle"></i>
                            간단한 자기소개를 입력해주세요.
                        </div>
                    </div>
                </div>
                <div class="inquiry-footer">
                    <div class="button-box">
                        <button id="btn-cancle" class="btn btn-gray btn-back ${myProfile.memberId}" type="button">
                            취소
                        </button>
                        <button
                            id="btn-update" type="button"
                            class="btn btn-partner btn-submit ${myProfile.memberId}">
                            수정
                        </button>
                    </div>
                </div>
            </form>`;

    myProfileLayout.innerHTML = text;
}