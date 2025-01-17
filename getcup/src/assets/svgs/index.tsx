import React from 'react';
import { Defs, G, LinearGradient, Path, Rect, Stop, ClipPath, Svg, Circle } from 'react-native-svg'; // import whichever features are used in your SVGs
export default {
    Cup: {
        svg: <G><Path d="M24.073 14.259h-1.96v-2.346c0-.681-.552-1.233-1.233-1.233H1.233C.552 10.68 0 11.232 0 11.913v16.89a5.342 5.342 0 0 0 5.342 5.342h11.424a5.342 5.342 0 0 0 5.342-5.342v-1.406h1.96a4.931 4.931 0 0 0 4.931-4.931V19.18a4.931 4.931 0 0 0-4.927-4.919l.001-.002zm-4.426 14.543a2.877 2.877 0 0 1-2.877 2.878H5.342a2.877 2.877 0 0 1-2.877-2.877V13.146h17.178l.004 15.656zm6.891-6.337a2.466 2.466 0 0 1-2.466 2.466h-1.96v-8.218h1.96a2.466 2.466 0 0 1 2.466 2.467v3.285zM12.287 7.118V1.681a1.233 1.233 0 1 0-2.466 0v5.437a1.233 1.233 0 1 0 2.466 0zM7.356 7.118V1.681a1.233 1.233 0 1 0-2.466 0v5.437a1.233 1.233 0 1 0 2.466 0zm9.863 0V1.681a1.233 1.233 0 1 0-2.466 0v5.437a1.233 1.233 0 1 0 2.466 0z"/></G>,
        viewBox: "0 0 29 35"
    },
    TermoCup: {
        svg: <G>
                <Path d="M6 41h64l-5.267 58.36a4 4 0 0 1-3.984 3.64H15.251a4 4 0 0 1-3.984-3.64L6 41z"/>
                <Rect y="13" width="76" height="19" rx="2"/>
                <Rect x="13" width="51" height="15" rx="2"/>
        </G>,
        viewBox: "0 0 76 103"
    },
    Map: {
        svg: <G>
            <Path d="M19.406 14.916h.3a4.956 4.956 0 0 0 4.621-5.226 5.031 5.031 0 0 0-1.638-3.407 4.94 4.94 0 1 0-3.282 8.638l-.001-.005zm-.216-8.119h.216c.781.01 1.532.302 2.116.821a3.094 3.094 0 0 1 1.08 2.2 3.202 3.202 0 1 1-6.392.389 3.145 3.145 0 0 1 2.98-3.411v.001z"/>
            <Path d="M38.151 30.896l-2.85-12.654a2.134 2.134 0 0 0-2.116-1.684h-5.486c.216-.346.389-.561.389-.6a.151.151 0 0 0 .038-.092.093.093 0 0 1 .086-.086.327.327 0 0 0 .086-.173c.39-.694.695-1.433.907-2.2a9.716 9.716 0 0 0 .389-2.764C29.539 5.053 24.992.551 19.401.551c-5.59 0-10.137 4.502-10.192 10.092-.008.201.006.402.043.6.046.85.206 1.692.475 2.5a8.567 8.567 0 0 0 1.08 2.289l.043.043c.043.086.173.216.3.432H5.626a2.134 2.134 0 0 0-2.113 1.691l-2.85 12.7a2.119 2.119 0 0 0 .432 1.814c.41.512 1.028.813 1.684.821h33.255a2.128 2.128 0 0 0 1.684-.821 2.27 2.27 0 0 0 .433-1.816zM10.942 10.684a8.465 8.465 0 0 1 16.93 0 8.128 8.128 0 0 1-.3 2.289 8.4 8.4 0 0 1-.734 1.814.093.093 0 0 1-.086.086c-.043.043-.043.086-.086.13-.13.173-.6.864-1.252 1.857-.043.043-.043.086-.086.13-1.943 2.937-5.4 8.076-5.83 8.724 0 .043-.043.043-.043.086-.346-.518-3.973-5.96-5.917-8.9-.216-.3-.389-.561-.561-.821l-.043-.043c-.3-.475-.561-.821-.648-.95l-.043-.043a8.152 8.152 0 0 1-.864-1.857 8.017 8.017 0 0 1-.389-2.073c-.005-.084-.048-.257-.048-.429zm25.438 20.99a.516.516 0 0 1-.346.173H2.779a.386.386 0 0 1-.346-.173.373.373 0 0 1-.086-.346l2.85-12.654a.421.421 0 0 1 .432-.346h6.651c2.116 3.153 5.658 8.508 5.7 8.551.32.47.857.745 1.425.734a1.61 1.61 0 0 0 1.382-.734c.043-.043.043-.086.086-.086.173-.259 3.585-5.4 5.658-8.465h6.651a.421.421 0 0 1 .432.346l2.85 12.611a.525.525 0 0 1-.084.388v.001z"/>
        </G>,
        viewBox: "0 0 39 35"
    },
    Circle: {
        svg: <Circle x="10" y="10" r="5" />,
        viewBox: "0 0 20 20"
    },
    Profile: {
        svg: <Path d="M21.09 20.94L21 20.9a12.62 12.62 0 0 0-1.9-.7 14.52 14.52 0 0 0-1.21-.3h-.07a4.86 4.86 0 0 0-.55-.1l-.05-.01h-.06l-.46-.07-.53-.05c-.66-.04-1.34-.04-1.99.01l-.19.02h-.08l-.23.02-.6.09h-.06a18.77 18.77 0 0 0-1.71.39l-.65.2-.14.05c-.43.15-.86.33-1.28.52l-.11.06a14.17 14.17 0 0 0-8.04 12.72l.01.37.04.86h28.12l.04-.85.02-.38c0-5.49-3.23-10.51-8.23-12.81zM2.47 33.6c.06-4.85 2.93-9.3 7.3-11.35l.14-.06.02-.01c.34-.16.7-.3 1.05-.43l.12-.04a10.79 10.79 0 0 1 1.76-.47l.32-.05.06-.01.59-.08.45-.04a12.1 12.1 0 0 1 1.84 0l.44.03.34.05.16.02.5.08.07.02a11.02 11.02 0 0 1 2.83.9l.04.02a12.77 12.77 0 0 1 7.44 11.42H2.47zm9.32-15.7c.1.05.21.08.32.12l.23.08.26.1c.82.26 1.68.39 2.55.4h.07a8.75 8.75 0 0 0 1.18-.1l.22-.02.37-.06.25-.06.24-.06a5.62 5.62 0 0 0 .56-.17l.19-.07a6.9 6.9 0 0 0 .56-.23l.06-.03c.2-.08.38-.16.56-.26l.12-.08a8.6 8.6 0 0 0 .94-.61l.35-.28a8.73 8.73 0 0 0 3.2-6.7V9.8a8.8 8.8 0 0 0-17.57-.55v.1l-.03.45a8.78 8.78 0 0 0 5.37 8.1zM7.82 9.45v-.12a7.42 7.42 0 0 1 14.82.4v.08c0 2.2-.99 4.28-2.7 5.71l-.33.25a3.75 3.75 0 0 1-.76.5l-.1.06-.47.22-.18.09-.33.12-.22.08-.13.05-.26.06-.28.07-.17.05-.28.04-.26.04-.2.03c-.23.02-.46.04-.7.04h-.06c-.75 0-1.5-.11-2.2-.34l-.18-.06-.26-.1-.24-.09A7.41 7.41 0 0 1 7.8 9.8c0-.12 0-.23.02-.35z"/>,
        viewBox: '0 0 30 36'
    },
    Americano: {
        svg: <G>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" x2="50%" y1="0%" y2="100%">
                    <Stop offset="0%" stopColor="#360C0C" />
                    <Stop offset="18.18%" stopColor="#360C0C" />
                    <Stop offset="18.62%" stopColor="#63BAD2" />
                    <Stop offset="43.83%" stopColor="#64BED6" />
                    <Stop offset="44.57%" stopColor="#651919" />
                    <Stop offset="100%" stopColor="#651919" />
                </LinearGradient>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Circle cx={35} cy={35} r={35} fill="#360C0C" />
                <G stroke="#FFF">
                    <Path
                        fill="#FFF"
                        d="M20 50h30.4c-.08.71-.73 1.21-1.96 1.5-4 .94-11.16 1.5-13.03 1.5-2.06 0-8.72-.36-13.52-1.5-1.04-.25-1.67-.75-1.89-1.5z"
                    />
                    <Path d="M45.31 29.51c2.47-.25 3.99.72 4.55 2.93.3 1.17.18 4.1-1.15 5.61-.8.9-3.03 1.93-6.71 3.08" />
                    <Path
                        fill="url(#prefix__a)"
                        d="M4 .34c0 .45 4.07 18.15 6.1 21h9.39C21.5 18.49 26 .79 26 .34c0-.45-22-.45-22 0z"
                        transform="translate(20 26)"
                    />
                </G>
            </G>
        </G>,
        viewBox: "0 0 70 70",
    },
    Cappuccino: {
        svg: <G>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" x2="50%" y1="0%" y2="100%">
                    <Stop offset="0%" stopColor="#360C0C" />
                    <Stop offset="18.55%" stopColor="#360C0C" />
                    <Stop offset="19.43%" stopColor="#F3D5B9" />
                    <Stop offset="43.83%" stopColor="#F3D5B9" />
                    <Stop offset="44.57%" stopColor="#651919" />
                    <Stop offset="100%" stopColor="#651919" />
                </LinearGradient>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Circle cx={35} cy={35} r={35} fill="#360C0C" />
                <G stroke="#FFF">
                    <Path
                        fill="#FFF"
                        d="M20 50h30.4c-.08.71-.73 1.21-1.96 1.5-4 .94-11.16 1.5-13.03 1.5-2.06 0-8.72-.36-13.52-1.5-1.04-.25-1.67-.75-1.89-1.5z"
                    />
                    <Path d="M45.31 29.51c2.47-.25 3.99.72 4.55 2.93.3 1.17.18 4.1-1.15 5.61-.8.9-3.03 1.93-6.71 3.08" />
                    <Path
                        fill="url(#prefix__a)"
                        d="M4 .34c0 .45 4.07 18.15 6.1 21h9.39C21.5 18.49 26 .79 26 .34c0-.45-22-.45-22 0z"
                        transform="translate(20 26)"
                    />
                </G>
            </G>
        </G>,
        viewBox: "0 0 70 70",
    },
    Latte: {
        svg: <G>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" x2="50%" y1="0%" y2="100%">
                    <Stop offset="0%" stopColor="#F9E7D7" />
                    <Stop offset="18.55%" stopColor="#FAE3CE" />
                    <Stop offset="19.43%" stopColor="#F3D5B9" />
                    <Stop offset="43.83%" stopColor="#F3D5B9" />
                    <Stop offset="44.57%" stopColor="#651919" />
                    <Stop offset="100%" stopColor="#651919" />
                </LinearGradient>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Circle cx={35} cy={35} r={35} fill="#360C0C" />
                <G stroke="#FFF">
                    <Path
                        fill="#FFF"
                        d="M20 50h30.4c-.08.71-.73 1.21-1.96 1.5-4 .94-11.16 1.5-13.03 1.5-2.06 0-8.72-.36-13.52-1.5-1.04-.25-1.67-.75-1.89-1.5z"
                    />
                    <Path d="M45.31 29.51c2.47-.25 3.99.72 4.55 2.93.3 1.17.18 4.1-1.15 5.61-.8.9-3.03 1.93-6.71 3.08" />
                    <Path
                        fill="url(#prefix__a)"
                        d="M4 .34c0 .45 4.07 18.15 6.1 21h9.39C21.5 18.49 26 .79 26 .34c0-.45-22-.45-22 0z"
                        transform="translate(20 26)"
                    />
                </G>
            </G>
        </G>,
        viewBox: "0 0 70 70",
    },
    Espresso: {
        svg: <G>
            <Defs>
                <LinearGradient id="prefix__a" x1="50%" x2="50%" y1="0%" y2="100%">
                    <Stop offset="0%" stopColor="#360C0C" />
                    <Stop offset="43.79%" stopColor="#360C0C" />
                    <Stop offset="44.57%" stopColor="#651919" />
                    <Stop offset="100%" stopColor="#651919" />
                </LinearGradient>
            </Defs>
            <G fill="none" fillRule="evenodd">
                <Circle cx={35} cy={35} r={35} fill="#360C0C" />
                <G stroke="#FFF">
                    <Path
                        fill="#FFF"
                        d="M20 50h30.4c-.08.71-.73 1.21-1.96 1.5-4 .94-11.16 1.5-13.03 1.5-2.06 0-8.72-.36-13.52-1.5-1.04-.25-1.67-.75-1.89-1.5z"
                    />
                    <Path d="M45.31 29.51c2.47-.25 3.99.72 4.55 2.93.3 1.17.18 4.1-1.15 5.61-.8.9-3.03 1.93-6.71 3.08" />
                    <Path
                        fill="url(#prefix__a)"
                        d="M4 .34c0 .45 4.07 18.15 6.1 21h9.39C21.5 18.49 26 .79 26 .34c0-.45-22-.45-22 0z"
                        transform="translate(20 26)"
                    />
                </G>
            </G>
        </G>,
        viewBox: "0 0 70 70",
    },
}
