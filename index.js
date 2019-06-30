import React, { PureComponent } from "react";
import { Animated, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import PropTypes from "prop-types";

class LoaderSkeletor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0)
        };
    }
    startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: this.props.animationDuration, 
                }),
                Animated.timing(this.state.animation, {
                    toValue: 0,
                    duration: this.props.animationDuration, 
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
            </View>
        );
    }
}

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
    },
    containerImg: {
        width: '30%',
        borderRadius: '5rem'
    },
    containerLines: {
    },
    paragraphListPub: {
        width: '100%',
        marginVertical: '3rem',
        marginHorizontal: '5%',
        borderRadius: '3rem'
    }
});


export default LoaderSkeletor;