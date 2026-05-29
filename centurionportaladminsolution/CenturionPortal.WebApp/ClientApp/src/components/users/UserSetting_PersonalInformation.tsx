import { Upload, UploadFileStatus } from '@progress/kendo-react-upload'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSetting_Action_FindELSUser, UserSetting_Action_Save_Tab_PersonalInformation, UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto } from '../../store/actions/users/UserSettingAction'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_StateObject } from '../../store/stores/users/UserSettingStore'
import { Auth, Utils } from '../../utilities/Functions'
import { IELSUser } from '../shared/dataBaseIEntities/IELSUser'
import { UserSetting_Card, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxLabel, UserSetting_FormControl_FxText, UserSetting_Tab } from './UserSetting'






const UserSetting_PersonalInformation = () => {


    const State = useSelector(UserSetting_StateObject)
    const Dispatch = useDispatch()


    const Title = 'User Setting'



    const [FirstName_Value, FirstName_SetValue] = React.useState<string>('')
    const [LastName_Value, LastName_SetValue] = React.useState<string>('')
    const [Address1_Value, Address1_SetValue] = React.useState<string>('')
    const [Address2_Value, Address2_SetValue] = React.useState<string>('')
    const [Title_Value, Title_SetValue] = React.useState<string>('')
    const [Ext_Value, Ext_SetValue] = React.useState<string>('')

    const [HomePhone_Value, HomePhone_SetValue] = React.useState<string>('')
    const [MobilePhone_Value, MobilePhone_SetValue] = React.useState<string>('')
    const [Email_Value, Email_SetValue] = React.useState<string>('')



    const [FirstTime, FirstTime_Set] = React.useState(true)

    let labelWidth = '7em'
    let textWidth1 = '12em'
    let textWidth2 = '18em'

    const TbEmail = React.useRef<HTMLInputElement>(null)


    const [BnSave_Disabled, BnSave_SetDisabled] = React.useState(true)


    const [PhotoNew_Value, PhotoNew_SetValue] = React.useState<any>('')
    const [PhotoActually_Value, PhotoActually_SetValue] = React.useState<any>('')


    const SetInitialValues = (obj: IELSUser) => {
        FirstName_SetValue(obj.FirstName!)
        LastName_SetValue(obj.LastName!)
        Address1_SetValue(obj.Address1!)
        Address2_SetValue(obj.Address2!)
        Title_SetValue(obj.Title!)
        Ext_SetValue(obj.Ext!)
        HomePhone_SetValue(obj.HomePhone!)
        MobilePhone_SetValue(obj.MobilePhone!)
        Email_SetValue(obj.Email!)
    }

    React.useEffect(() => {

        BnSave_SetDisabled(false)

        if (FirstTime === true) {
            Dispatch(UserSetting_Action_FindELSUser((obj) => {

                FirstTime_Set(false)

                SetInitialValues(obj)

            }))


            Dispatch(UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto(200, 200, (image) => {
                PhotoActually_SetValue(image)

            }))
        }



        let obj = State.ObjELSUser

        if (
            obj.FirstName! != FirstName_Value || obj.LastName! != LastName_Value ||
            obj.Address1! != Address1_Value || obj.Address2! != Address2_Value ||
            obj.Title! != Title_Value ||
            obj.Ext! != Ext_Value ||
            obj.HomePhone! != HomePhone_Value || obj.MobilePhone! != MobilePhone_Value ||
            obj.Email! != Email_Value ||
            PhotoNew_Value != ''
        ) {
            BnSave_SetDisabled(false)
        } else {
            BnSave_SetDisabled(true)
        }

    }, [FirstName_Value, LastName_Value, Address1_Value, Address2_Value,
        Title_Value, Ext_Value, HomePhone_Value, MobilePhone_Value, Email_Value, PhotoNew_Value])

    const [Upload_Status, Upload_SetStatus] = React.useState('')
    const ObjUpload = React.useRef<Upload>(null)

    return (
        <UserSetting_Tab TabUrl={UserSetting_PersonalInformation_Url}>

            <div>

                <UserSetting_Card title='Photo' width='300px'
                    className='mb-2 mr-2  d-inline-flex '
                    cardBodyClassName='p-1 d-flex flex-column align-items-center' >


                    <img width='200' height='200'
                        src={PhotoNew_Value === '' ? PhotoActually_Value : PhotoNew_Value} className='m-1 img-thumbnail' />

                    <Upload
                        ref={ObjUpload}
                        className=' w-100'
                        batch={false}
                        multiple={false}
                        defaultFiles={[]}
                        withCredentials={false}
                        showActionButtons={true}
                        restrictions={{ allowedExtensions: ['.jpg', '.png'], maxFileSize: 1000000 }}

                        saveUrl={`api/ELSUser/updatePersonalInformation_NewPhoto_Add`}
                        removeUrl={`api/ELSUser/updatePersonalInformation_NewPhoto_Remove`}
                        saveHeaders={{ Authorization: `Bearer ${Auth.getJWT()}` }}
                        removeHeaders={{ Authorization: `Bearer ${Auth.getJWT()}` }}

                        onAdd={event => {

                            event.affectedFiles
                                .filter(file => !file.validationErrors)
                                .forEach(file => {

                                    const reader = new FileReader();

                                    reader.onloadend = (reader_event) => {
                                        PhotoNew_SetValue(reader_event.target?.result!)
                                    };

                                    reader.readAsDataURL(file.getRawFile!());
                                });
                        }}

                        onRemove={event => {
                            
                            PhotoNew_SetValue('')
                        }}
                        onStatusChange={event => {
                            switch (event.affectedFiles[0].status) {
                                case UploadFileStatus.Uploading:
                                    Upload_SetStatus('Uploading')
                                    break;
                                //case UploadFileStatus.Removing:
                                //    Upload_SetStatus('Removing')
                                //    break;
                                //case UploadFileStatus.Selected:
                                //    Upload_SetStatus('Selected');
                                //    break
                                default:
                                    Upload_SetStatus('')
                                    break
                            }
                            //console.log('statuss', 'x' + Upload_Status + ' ' + event.affectedFiles[0].status)

                        }}
                    //onProgress={event => {
                    //    console.log('progress: '+event.affectedFiles[0].progress)
                    //}}

                    />

                </UserSetting_Card>

                <UserSetting_Card title='Personal Information' className='mb-2 mr-2 d-inline-flex' cardBodyClassName='p-1'  >
                    <div className='d-inline-block '>

                        <UserSetting_FormControl_FxLabel label={'User Name'} value={State.ObjELSUser?.Username!} labelWidth={labelWidth} textWidth={textWidth1} />
                        < UserSetting_FormControl_FxText label='First Name' value={FirstName_Value} labelWidth={labelWidth}
                            textWidth={textWidth1} maxLength={30}
                            onChange={
                                event => FirstName_SetValue(event.currentTarget.value!)} />

                        < UserSetting_FormControl_FxText label='Last Name' value={LastName_Value} labelWidth={labelWidth} textWidth={textWidth1} maxLength={60}
                            onChange={event => LastName_SetValue(event.currentTarget.value!)} />

                        < UserSetting_FormControl_FxText label='Address 1' value={Address1_Value} labelWidth={labelWidth} textWidth={textWidth2} maxLength={50}
                            onChange={event => Address1_SetValue(event.currentTarget.value)} />
                        < UserSetting_FormControl_FxText label='Address 2' value={Address2_Value} labelWidth={labelWidth} textWidth={textWidth2} maxLength={50}
                            onChange={event => Address2_SetValue(event.currentTarget.value)} />



                    </div>

                    <div className='d-inline-block'>



                        < UserSetting_FormControl_FxText label='Title' value={Title_Value} labelWidth={labelWidth} textWidth={textWidth1} maxLength={40}
                            onChange={event => Title_SetValue(event.currentTarget.value)} />

                        < UserSetting_FormControl_FxText label='Ext' value={Ext_Value} labelWidth={labelWidth} textWidth={textWidth1} maxLength={5}
                            onChange={event => Ext_SetValue(event.currentTarget.value!)} />



                    </div>

                </UserSetting_Card>




                <UserSetting_Card title='Contact Information' className='mb-2 mr-2 d-inline-flex' cardBodyClassName='p-1'>
                    <div className='d-inline-block '>
                        < UserSetting_FormControl_FxText label='Home Phone' value={HomePhone_Value} labelWidth={labelWidth} textWidth={textWidth1} maxLength={30}
                            onChange={event => HomePhone_SetValue(event.currentTarget.value)} />
                        < UserSetting_FormControl_FxText label='Mobile Phone' value={MobilePhone_Value} labelWidth={labelWidth} textWidth={textWidth1} maxLength={30}
                            onChange={event => MobilePhone_SetValue(event.currentTarget.value)} />
                        < UserSetting_FormControl_FxText label='Email' value={Email_Value} labelWidth={labelWidth} textWidth={textWidth2} maxLength={100}
                            onChange={event => Email_SetValue(event.currentTarget.value)} />
                    </div>

                    <div className='d-inline-block  '>
                        <UserSetting_FormControl_FxLabel label={'Last login'} value={State.ObjELSUser?.LastLogin!} labelWidth={labelWidth} textWidth={textWidth1} />
                        <UserSetting_FormControl_FxLabel label={'Last logout'} value={State.ObjELSUser?.LastLogout!} labelWidth={labelWidth} textWidth={textWidth1} />
                        <UserSetting_FormControl_FxLabel label={'Last login IP'} value={State.ObjELSUser?.LoggedIP!} labelWidth={labelWidth} textWidth={textWidth1} />
                    </div>

                </UserSetting_Card>
            </div>
            <UserSetting_FormControl_FxButton
                title='Save'

                disabled={BnSave_Disabled} onClick={event => {

                    if (Upload_Status != '') {
                        Utils.validateData(Dispatch, 'The user photo is ' + Upload_Status, Title);
                    }
                    else if (TbEmail.current?.value != "" && TbEmail.current?.checkValidity() === false) {
                        Utils.validateData(Dispatch, 'Email field incorrect', Title)
                    } else {
                        Dispatch(UserSetting_Action_Save_Tab_PersonalInformation(
                            State.ObjELSUser as IELSUser,
                            FirstName_Value, LastName_Value,
                            Address1_Value, Address2_Value,
                            Title_Value, Ext_Value, HomePhone_Value, MobilePhone_Value, Email_Value,

                            obj => {
                                SetInitialValues(obj)
                                BnSave_SetDisabled(true)
                                PhotoActually_SetValue(PhotoNew_Value)
                                PhotoNew_SetValue('')
                                
                                    ObjUpload.current?.onClear(); 
                                
                            }))
                    }
                }} />


        </UserSetting_Tab>
    )


}



export const UserSetting_PersonalInformation_Url = Utilities_Url_CreateUniquePath('UserSetting_PersonalInformation')// '/UserSetting_PersonalInformation'

export default UserSetting_PersonalInformation