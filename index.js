import React, { PureComponent } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import PropTypes from "prop-types";
//import colors from "../../utils/colors";
const AVATAR_SIZE = {
    default: 50,
    large: 30,
    small: 25
};

class LoaderSkeletor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0)
        };
    }
    startAnimation = () => {
        //Animacion con loop infinito
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: this.props.animationDuration, //default 500
                }),
                Animated.timing(this.state.animation, {
                    toValue: 0,
                    duration: this.props.animationDuration, //default 500
                })
            ])
        ).start();
    };
    componentDidMount() {
        if (this.props.active) {
            this.startAnimation();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loading !== this.props.loading) {
            if (this.props.loading) {
                this.startAnimation();
            }
        }
    }

    render() {
        // colores
        const interpolatedBackground = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.props.primaryColor, this.props.secondaryColor, this.props.thirdColor]
        });
        const {
            title,
            paragraph,
            pHeight,
            pWidth,
            pRows,
            paragraphStyles,
            tHeight,
            tWidth,
            titleStyles,
            avatar,
            aShape,
            aSize,
            avatarStyles,
            reverse,
            containerStyles,
            loading,
            listPublication,
            quanityItem,
            withImage,
            numberLines
        } = this.props;
        if (loading === false) {
            return this.props.children || null;
        }
        //retorna la altura y ancho para cada parrafo
        const paragraphInitialStyles = index => {
            let height = pHeight;
            let width = pWidth;
            if (pWidth.constructor === Array && pWidth[index]) {
                width = pWidth[index];
            }
            return {
                height,
                width
            };
        };
        //altura y ancho de titulo
        const titleInitialStyles = {
            height: tHeight,
            width: tWidth
        };
        // configuracion de avatar
        const avatarInitialStyles = {
            height: AVATAR_SIZE[aSize] || aSize,
            width: AVATAR_SIZE[aSize] || aSize,
            borderRadius: aShape === "circle" ? AVATAR_SIZE[aSize] / 2 || aSize / 2 : 3,
            marginRight: reverse ? 0 : 10, //reverse true false define en que lugar se muestra
            marginLeft: reverse ? 10 : 0   // el avatar
        };
        return (
            <View
                style={[
                    styles.container,
                    { flexDirection: reverse ? "row-reverse" : "row" },
                    containerStyles
                ]}
            >
                {listPublication && (
                    <View>
                        {[...Array(quanityItem)].map((_, i) => (
                            <View
                                style={[                                    
                                    styles.containerList
                                ]}>
                                    {withImage && (
                                         <Animated.View
                                         style={[
                                             styles.containerImg,
                                             { backgroundColor: interpolatedBackground }
                                         ]}
                                     />
                                    )}
                               
                                <View
                                    style={[styles.containerLines, withImage ?{ width: '70%'} : { width: '100%'} ]}>
                                    {[...Array(numberLines)].map((_, index) => (
                                        <Animated.View      
                                            key={index}
                                            style={[
                                                styles.paragraphListPub,
                                                paragraphInitialStyles(index),//altura ancho
                                                paragraphStyles,
                                                { backgroundColor: interpolatedBackground }
                                            ]}
                                        />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>


                )}
                {/* {listPublication && (
                    
                    <View
                        style={[
                            //original
                            //styles.paragraph,
                            //paragraphInitialStyles(index),//altura ancho
                            //paragraphStyles,
                            styles.containerList,
                            //{ backgroundColor: interpolatedBackground }
                        ]}>
                        <Animated.View
                            style={[
                                styles.containerImg,
                                { backgroundColor: interpolatedBackground }
                            ]}
                        />
                        <View
                            style={styles.containerLines}>
                            {[...Array(4)].map((_, index) => (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.paragraphListPub,
                                        paragraphInitialStyles(index),//altura ancho
                                        paragraphStyles,
                                        { backgroundColor: interpolatedBackground }
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                )} */}
                {/* {avatar && (
                    <Animated.View
                        style={[
                            styles.avatar,
                            avatarInitialStyles,
                            avatarStyles,
                            { backgroundColor: interpolatedBackground }
                        ]}
                    />
                )}

                <View style={styles.content}>
                    {title && (
                        <Animated.View
                            style={[
                                styles.title,
                                titleInitialStyles,
                                titleStyles,
                                { backgroundColor: interpolatedBackground }
                            ]}
                        />
                    )}
                    {paragraph && (
                        <View style={styles.paragraphContainer}>
                            {[...Array(pRows)].map((_, index) => (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.paragraph,
                                        paragraphInitialStyles(index),//altura ancho
                                        paragraphStyles,
                                        { backgroundColor: interpolatedBackground }
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                    
                                </View> */}
            </View>
        );
    }
}

/************** VERIFICACION DE TIPOS **************/
LoaderSkeletor.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    thirdColor: PropTypes.string,
    animationDuration: PropTypes.number,
    loading: PropTypes.bool,
    title: PropTypes.bool,
    paragraph: PropTypes.bool,
    pHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]),
    pRows: PropTypes.number,
    tWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    paragraphStyles: PropTypes.object,
    titleStyles: PropTypes.object,

    avatar: PropTypes.bool,
    aShape: PropTypes.oneOf(["circle", "square"]),
    aSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["small", "large", "default"])
    ]),
    reverse: PropTypes.bool,
    containerStyles: PropTypes.object,
    quanityItem: PropTypes.number,

    listPublication: PropTypes.bool,
    withImage: PropTypes.bool,
    numberLines: PropTypes.number
};
/************** FIN VERIFICACION DE TIPOS **************/

/************** VALORES POR DEFAULT **************/
LoaderSkeletor.defaultProps = {
    primaryColor: "rgba(195, 191, 191, 1)",
    secondaryColor: "rgba(213, 211, 211, 1)",
    //secondaryColor: "rgba(218, 215, 215, 1)",
    thirdColor: "rgba(218, 215, 215, 1)",
    animationDuration: 500,
    loading: null,
    active: false,
    title: true,
    paragraph: true,
    pHeight: 14,
    pWidth: "90%",
    pRows: 4,
    tWidth: "60%",
    tHeight: 20,
    paragraphStyles: {},
    titleStyles: {},
    avatar: false,
    aShape: "circle",
    aSize: "default",
    reverse: false,
    containerStyles: {},
    quanityItem: 1,
    listPublication: true,
    withImage: true,
    numberLines: 4
};
/************** FIN VALORES POR DEFAULT **************/

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 10
    },
    content: {
        flex: 1
    },
    avatar: {
        borderRadius: 2
    },
    title: {
        marginBottom: 10,
        borderRadius: 3
    },
    paragraph: {
        marginVertical: 5,
        borderRadius: 3
    },

    paragraphContainer: {},

    //LIST PUBLICATION
    containerList: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: '10rem',
        //marginHorizontal: '5%',
    },
    containerImg: {
        width: '30%',
        borderRadius: '5rem'
    },
    containerLines: {
        //width: '70%',
    },
    paragraphListPub: {
        width: '100%',
        marginVertical: '3rem',
        marginHorizontal: '5%',
        borderRadius: '3rem'
    }
});


module.exports = {
    LoaderSkeletor
} 