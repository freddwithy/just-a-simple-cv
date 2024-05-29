import { StyleSheet } from "@react-pdf/renderer";

export const defaultTemplate = StyleSheet.create({
    page: {
        padding: 30,
        gap: 20,
        fontFamily: 'Roboto',
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    mainName: {
        fontSize: 25,
        fontWeight: 500,
    },
    shortResume: {
        color: 'rgb(55 65 81)',
        fontSize: 13,
        fontWeight: 400,
        maxWidth: '350px'
    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    city: {
        fontSize: 12,
        fontWeight: 500,
        color: 'rgb(31 41 55)'
    },
    icon: {
        width: 15,
        height: 15
    },
    image: {
        width: 110,
        height: 110,
        objectFit: 'cover',
        borderRadius: 8
    },
    aboutMeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    aboutMe: {
        fontSize: 16,
        fontWeight: 500,
    },
    aboutMeText: {
        fontWeight: 400,
        fontSize: 12,
        color: 'rgb(55 65 81)'
    },
    experienceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    experienceTitle: {
        fontSize: 16,
        fontWeight: 500,
    },
    experienceItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    experienceCompany: {
        fontSize: 12,
        fontWeight: 500,
        gap: 2,
        color: 'rgb(55 65 81)'
    },
    experiencePosition: {
        fontSize: 12,
        fontWeight: 300,
        color: 'rgb(55 65 81)'
    },
    experienceDate: {
        fontSize: 14,
        fontWeight: 500,
        gap: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'rgb(55 65 81)'
    },
    educationContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    educationTitle: {
        fontSize: 16,
        fontWeight: 500,
    },
    educationItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    educationCompany: {
        fontSize: 12,
        fontWeight: 500,
        gap: 2,
        color: 'rgb(55 65 81)'
    },
    educationPosition: {
        fontSize: 12,
        fontWeight: 300,
        color: 'rgb(55 65 81)'
    },
    educationDate: {
        fontSize: 14,
        fontWeight: 'semibold',
        color: 'rgb(55 65 81)',
        gap: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    skillContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    skillTitle: {
        fontSize: 16,
        fontWeight: 500,
    },
    skillItem: {
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'rgb(55 65 81)',
        padding: 5,
        borderWidth: 1,
        color: 'rgb(55 65 81)',
    },
    skillBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgb(229, 231, 235)',
    }
})