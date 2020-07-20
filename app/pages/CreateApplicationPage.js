import React, { Component } from 'react';
import { 
    View, ScrollView, 
    TextInput, Text, TouchableOpacity, 
    Image, Alert, Modal
    }
 from 'react-native';
 import moment from 'moment';
import { connect } from 'react-redux';
import style from '../styles/page.CreatePost.style';
import { BackButton, GradientButton, WhiteButton } from '../components/Button';
import { CampaignAction } from '../redux/actions/campaign.action';
import { HttpForm } from '../services/http';
import image from '../assets';
import { URL } from '../config/url';

class CreateApplicationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasImage: false,
            isSaving: false,

            jobevent_id: 0,
            job_description: '',
            isValidated: false,
            event: this.props.navigation.getParam('campaign'),
            fromDashboard: false,

            job: null, 
            modalVisible: false,
            jobs_schedule_selected: [],
            jobs_schedule_temp: [],

            temp: [],
            schedule_isSelectedAll: false
        };
    }
    
    submit = () => {
        if (this.validate()) {
            this.setState({ isSaving: true });
            let job_selected = [];

            this.state.event.jobs.map(job => {
                if(this.state.jobs_schedule_selected.find(j => j.job_id == job.job_id) !== undefined){
                    job_selected.push(job.id);
                }
            });
            
            const formData = new FormData();
            formData.append('job_selected', JSON.stringify(job_selected));
            formData.append('jobs_schedule_selected', JSON.stringify(this.state.jobs_schedule_selected));
            
            HttpForm.post(URL.EVENT.APPLY, formData)
            .then(response => { 
                this.setState({
                    isSaving: false
                });
                console.log(response);
                this.props.getMyList();
                this.props.navigation.navigate('MyCampaign');
            })
            .catch(e => {
                this.setState({ isSaving: false });
                console.log('error');
                console.log(e);
                console.log(e.response);
                console.log(e.response.data.errors);
                console.log(e.message);
                console.log(e.request);
            });
        }
    }

    validate = () => {
        let willContinue = false;

        if (this.state.jobs_schedule_selected !== []) {
            willContinue = true;
        }

        return willContinue;
    }

    status = () =>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#999', fontSize: 17 }}>
                Status 
                <Text 
                    style={{ 
                        color: '#ff3c00',
                        fontWeight: 'bold'
                    }}
                > PENDING APPOVAL</Text>
            </Text>
        </View>
    
    jobs = () => 
        <>
            <Text style={style.jobLabel}>Select a Job</Text>

            { this.state.event.jobs.map((job, index) => 
                <View style={style.jobcontainer} key={`jobcontainer_${index}`}>
                    <Text style={style.jobName} >
                        {job.job_description}
                    </Text>
                    { this.state.jobs_schedule_selected.find(s => s.job_id == job.job_id) &&
                        <Text style={style.jobReady} >
                            Application Ready
                        </Text>
                    }
                    {/* Job Skill */}
                        <View style={{ margin: 20}}>
                            <Text style={{ alignSelf: 'center', marginBottom: 5 }}>Skills Required</Text>
                            <View style={style.modalSkillContainer}> 
                                {job.skills.map((skill, index) => 
                                    <Text key={index} style={style.modalJobSkill}>{ skill.skill_description }</Text>
                                )}
                            </View>
                        </View>

                    {/* Rates */}
                        <View style={style.rateContainer}>
                            <Text style={{ alignSelf: 'center' }}>Rate</Text>
                            <Text style={style.jobRate}>{this.props.user.country.monetary_sign.toUpperCase()}{parseInt(job.rate).toLocaleString()}/{job.rate_unit.toUpperCase()}</Text>
                        </View>

                    <View style={{ margin: 20}}>
                        <GradientButton 
                            text={this.state.jobs_schedule_selected.find(s => s.job_id == job.job_id) ? 'Change' : 'Apply'} style={{ margin: 20 }} 
                            onPress={() => { 
                                this.setState({
                                    job,
                                    modalVisible: true,
                                    jobs_schedule_temp: this.state.jobs_schedule_selected.slice()
                                });
                            }}   
                        />
                    </View>

                </View>
            )}
        </>

    buttons = () =>
        <View style={{ marginHorizontal: 20, marginTop: 25, marginBottom: 35 }}>
         
            <GradientButton 
                text="Submit Application" style={{ marginBottom: 10 }} 
                onPress={() => { this.submit(); }}   
                isSaving={this.state.isSaving}
            />
            
            <WhiteButton 
                text="Find More Events" 
                border={true} 
                onPress={() => { this.props.navigation.navigate('Home'); }} 
            />
        </View>

    addJobSchedule = () => {
        console.log('add pressed');
        this.setState({
            jobs_schedule_selected: this.state.jobs_schedule_temp,
        }, () => {
            console.log(this.state.jobs_schedule_selected);
            this.closeModal();
        });
    }

    closeModal = () => {
        console.log('close modal')
        this.setState({ 
            job: null,
            modalVisible: false,
            jobs_schedule_temp: [],
            schedule_isSelectedAll: false
        }); 
    }

    checkConflict = (sched) => {
        let isConflict = false;
        let thisDateArray = this.state.jobs_schedule_temp.filter(s => s.schedule_date == sched.schedule_date);
        
        thisDateArray.map(d => {
            if(d.job_id != sched.job_id) {
                isConflict = true;
            }
        });

        return isConflict;
    }

    jobDetailsModal = () => 
        <Modal
            style={style.modalJob}
            animationType={'slide'}
            visible={this.state.modalVisible}
            onRequestClose={() => { 
                this.closeModal();
            }}
        >
            { this.state.job && 
            <View style={style.modalContainer}>
                <ScrollView >
                    {/* BACK BUTTON */}
                        <TouchableOpacity style={{ marginBottom: 25 }}
                            onPress={() => {
                                this.closeModal();
                            }}
                        >
                            <Image 
                                style={{ width: 18, height: 18 }}
                                source={image.icon.back_icon_dark}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                    {/* Job Title */}
                        <View style={style.modalBlockContainer}>
                            <Text style={style.modalJobDescription}>{this.state.job.job_description}</Text>
                        </View>

                    

                    {/* Schedule LIst */}
                        <View style={style.modalBlockContainer}>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}>Select schedule</Text>
                            <View style={style.modalScheduleList}>
                                    <TouchableOpacity 
                                        style={
                                            this.state.schedule_isSelectedAll ? 
                                            style.modalSchedButtonAllSelected : 
                                            style.modalSchedButtonAll
                                        }
                                        onPress={() => {
                                            if(!this.state.schedule_isSelectedAll){
                                                let hasConflict = 0;
                                                this.state.job.schedule.map(sched => {
                                                    if(this.checkConflict(sched)) {
                                                        hasConflict++;
                                                    }
                                                });

                                                if(hasConflict == 0) {
                                                    this.setState({
                                                        jobs_schedule_temp: this.state.job.schedule,
                                                        schedule_isSelectedAll: !this.state.schedule_isSelectedAll
                                                    });
                                                } else {
                                                    Alert.alert('Error', 'Cannot select all, there is a schedule conflicting to other selected job. Please check first.');
                                                }
                                                
                                            } else {
                                                this.setState({
                                                    jobs_schedule_temp: [],
                                                    schedule_isSelectedAll: !this.state.schedule_isSelectedAll
                                                });
                                            }
                                            
                                        }}
                                    >
                                        <Text 
                                            style={
                                                this.state.schedule_isSelectedAll ? 
                                                style.textWhite : 
                                                {}
                                            }
                                        >Select All</Text>
                                    </TouchableOpacity>
                                    
                                    { this.state.job.schedule.filter(s => s.isRemoved === 0).map((sched, index) =>
                                        <TouchableOpacity 
                                            key={`schedlist_${index}`}
                                            style={
                                                this.checkConflict(sched) ?  style.modalSchedButtonConflict :
                                                this.state.jobs_schedule_temp.find(s => s.id == sched.id) != undefined ?
                                                style.modalSchedButtonSelected :
                                                style.modalSchedButton}
                                            onPress={() => {
                                                let isConflict = this.checkConflict(sched);

                                                if(isConflict) {
                                                    Alert.alert('This schedule conflicts to your other added job');
                                                } else {
                                                    const jobSched = this.state.jobs_schedule_temp;
                                                    let jobSched_isExist = jobSched.find(s => s.id == sched.id);
                                                    if(jobSched_isExist) {
                                                        console.log('existed');
                                                        let jobSched_filtered = jobSched.filter(s => s.id != sched.id);
                                                        this.setState({
                                                            jobs_schedule_temp: jobSched_filtered
                                                        });
                                                    } else {
                                                        console.log('new');
                                                        jobSched.push(sched);
                                                        this.setState({
                                                            jobs_schedule_temp: jobSched
                                                        });
                                                    }
                                                }
                                            }}
                                        >
                                            <View style={style.modalSchedButtonContent}>
                                                <Text style={{
                                                    fontSize: 15, 
                                                    fontWeight: 'bold',
                                                    color: this.state.jobs_schedule_temp.find(s => s.id == sched.id) != undefined ? '#fff' : '#515151'
                                                }}>
                                                    { moment(sched.schedule_date).format('MMM DD, Y') }
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: this.state.jobs_schedule_temp.find(s => s.id == sched.id) != undefined ? '#fff' : '#515151'
                                                    }}
                                                >{ moment(sched.schedule_date).format('dddd') }</Text>
                                            </View>
                                            
                                            <View style={style.modalSchedButtonContent}>
                                                <Text
                                                    style={{
                                                        color: this.state.jobs_schedule_temp.find(s => s.id == sched.id) != undefined ? '#fff' : '#515151'
                                                    }}
                                                >IN: { moment(sched.schedule_from).format('hh:mm A') }</Text>
                                                <Text
                                                    style={{
                                                        color: this.state.jobs_schedule_temp.find(s => s.id == sched.id) != undefined ? '#fff' : '#515151'
                                                    }}
                                                >OUT: { moment(sched.schedule_to).format('hh:mm A') }</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                            </View>
                        </View>

                    <GradientButton 
                        text="Done" style={{ marginBottom: 10 }} 
                        onPress={() => { 
                            this.addJobSchedule();
                        }}
                        isSaving={this.state.isSaving}
                    />
                     <WhiteButton 
                        text="Cancel" 
                        border={true} 
                        onPress={() => { this.closeModal(); }} 
                    />
                </ScrollView>
            </View>
            }
            
            
        </Modal>

    render = () => 
        <>
            { this.jobDetailsModal() }

            <ScrollView>
                <BackButton darkButton={true} />
                
                { this.jobs() }
                
                { this.buttons() }
                
            </ScrollView>
        </>

}

const mapDispatchtoProps = dispatch => ({
    getMyList: () => dispatch(CampaignAction.getMyList())
});

const mapStatetoProps = state => ({
    user:  state.user.profile
})

export default connect(mapStatetoProps, mapDispatchtoProps)(CreateApplicationPage);
