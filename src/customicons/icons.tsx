import React from 'react';

interface Props {
    color?: string;
    height?: string;
    width?: string;
}

export function MyVillageIcon({ color = '#9A9A9A', height = '24', width = '24px' }: Props) {
    return (
        <div>
            <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.3734 10.3613C23.2801 10.348 23.1867 10.348 23.0934 10.3613C21.0267 10.2946 19.3867 8.6013 19.3867 6.5213C19.3867 4.4013 21.1067 2.66797 23.2401 2.66797C25.3601 2.66797 27.0934 4.38797 27.0934 6.5213C27.0801 8.6013 25.4401 10.2946 23.3734 10.3613Z"
                    fill={color}
                />
                <path
                    d="M27.72 19.6005C26.2266 20.6005 24.1333 20.9739 22.2 20.7205C22.7066 19.6272 22.9733 18.4139 22.9866 17.1339C22.9866 15.8005 22.6933 14.5339 22.1333 13.4272C24.1066 13.1605 26.2 13.5339 27.7066 14.5339C29.8133 15.9205 29.8133 18.2005 27.72 19.6005Z"
                    fill={color}
                />
                <path
                    d="M8.58667 10.3613C8.68 10.348 8.77334 10.348 8.86667 10.3613C10.9333 10.2946 12.5733 8.6013 12.5733 6.5213C12.5733 4.38797 10.8533 2.66797 8.72 2.66797C6.6 2.66797 4.88 4.38797 4.88 6.5213C4.88 8.6013 6.52 10.2946 8.58667 10.3613Z"
                    fill={color}
                />
                <path
                    d="M8.73337 17.1341C8.73337 18.4275 9.01337 19.6541 9.52003 20.7608C7.64003 20.9608 5.68003 20.5608 4.24003 19.6141C2.13337 18.2141 2.13337 15.9341 4.24003 14.5341C5.6667 13.5741 7.68003 13.1875 9.57337 13.4008C9.0267 14.5208 8.73337 15.7875 8.73337 17.1341Z"
                    fill={color}
                />
                <path
                    d="M16.16 21.16C16.0534 21.1467 15.9334 21.1467 15.8134 21.16C13.36 21.08 11.4 19.0667 11.4 16.5867C11.4134 14.0533 13.4534 12 16 12C18.5334 12 20.5867 14.0533 20.5867 16.5867C20.5734 19.0667 18.6267 21.08 16.16 21.16Z"
                    fill={color}
                />
                <path
                    d="M11.8267 23.9195C9.81332 25.2662 9.81332 27.4795 11.8267 28.8129C14.12 30.3462 17.88 30.3462 20.1733 28.8129C22.1867 27.4662 22.1867 25.2529 20.1733 23.9195C17.8933 22.3862 14.1333 22.3862 11.8267 23.9195Z"
                    fill={color}
                />
            </svg>
        </div>
    );
}

export const JobIcon: React.FC<Props> = ({ color = '#292D32', height = '24', width = '24' }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="vuesax/linear/briefcase">
                <g id="briefcase">
                    <path
                        id="Vector"
                        d="M5.33338 14.6667H10.6667C13.3467 14.6667 13.8267 13.5933 13.9667 12.2867L14.4667 6.95333C14.6467 5.32667 14.18 4 11.3334 4H4.66671C1.82005 4 1.35338 5.32667 1.53338 6.95333L2.03338 12.2867C2.17338 13.5933 2.65338 14.6667 5.33338 14.6667Z"
                        stroke={color}
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_2"
                        d="M5.33337 3.99992V3.46659C5.33337 2.28659 5.33337 1.33325 7.46671 1.33325H8.53337C10.6667 1.33325 10.6667 2.28659 10.6667 3.46659V3.99992"
                        stroke={color}
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_3"
                        d="M9.33329 8.66667V9.33333C9.33329 9.34 9.33329 9.34 9.33329 9.34667C9.33329 10.0733 9.32663 10.6667 7.99996 10.6667C6.67996 10.6667 6.66663 10.08 6.66663 9.35333V8.66667C6.66663 8 6.66663 8 7.33329 8H8.66663C9.33329 8 9.33329 8 9.33329 8.66667Z"
                        stroke={color}
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_4"
                        d="M14.4334 7.33325C12.8934 8.45325 11.1334 9.11992 9.33337 9.34659"
                        stroke={color}
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        id="Vector_5"
                        d="M1.7467 7.51343C3.2467 8.54009 4.94004 9.16009 6.6667 9.35343"
                        stroke={color}
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
};

export const FeedIconSVG = ({ color = '#9A9A9A', height = '24', width = '24px' }: Props) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M27.7734 10.6813L19.04 3.69466C17.3334 2.33466 14.6667 2.32133 12.9734 3.68133L4.24003 10.6813C2.9867 11.6813 2.2267 13.6813 2.49337 15.2547L4.17337 25.308C4.56003 27.5613 6.65337 29.3347 8.93336 29.3347H23.0667C25.32 29.3347 27.4534 27.5213 27.84 25.2947L29.52 15.2413C29.76 13.6813 29 11.6813 27.7734 10.6813ZM17 24.0013C17 24.548 16.5467 25.0013 16 25.0013C15.4534 25.0013 15 24.548 15 24.0013V20.0013C15 19.4547 15.4534 19.0013 16 19.0013C16.5467 19.0013 17 19.4547 17 20.0013V24.0013Z"
                fill={color}
            />
        </svg>
    );
};
