const LikeIcon = (props) => {

    return (
        <svg style={props.isFavourite ? {fill:"#FD7114"}: null} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" id={props.elementId} onClick={(event) => props.handleClick(event)}>
            <g filter="url(#filter0_d)">
            <path fillRule="evenodd" clipRule="evenodd" d="M19 32C27.2843 32 34 25.2843 34 17C34 8.71573 27.2843 2 19 2C10.7157 2 4 8.71573 4 17C4 25.2843 10.7157 32 19 32Z" fill="white"/>
            </g>
            <path d="M18.0369 24.4123L18.0362 24.4116C15.7088 22.2392 13.8169 20.4723 12.5008 18.816C11.1909 17.1674 10.5 15.6868 10.5 14.0954C10.5 11.5044 12.4677 9.5 14.95 9.5C16.3591 9.5 17.7236 10.1777 18.6147 11.255L19 11.7206L19.3853 11.255C20.2764 10.1777 21.6409 9.5 23.05 9.5C25.5323 9.5 27.5 11.5044 27.5 14.0954C27.5 15.6868 26.8091 17.1674 25.4991 18.8173C24.1846 20.4726 22.2959 22.2393 19.9728 24.4125L19.9645 24.4202L19.9634 24.4212L19.0013 25.316L18.0369 24.4123Z" stroke="#707070"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.163407 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
        </svg>

    );
}

export default LikeIcon;