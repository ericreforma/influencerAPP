import React, { Component } from 'react';
import { ScrollView, View, TextInput, Alert, Picker, ActivityIndicator} from 'react-native';
import { Title } from '../components/Header';
import { GradientButton } from '../components/Button';
import style from '../styles/page.ReportProblem.style';
import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

export default class ReportProblemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: [
                'General Enquiry',
                'Profile-Based Questions',
                'Remuneration',
                'Campaigns (Online)',
                'Campaigns  (Offline)'
            ],
            subject: 'General Enquiry',
            message: '',
            title: '',
            isSaving: false
        };
    }

    submit = () => {
        if (this.state.title === '') {
            Alert.alert('Error', 'Title should not be empty');
        } else if (this.state.message === ''){
            Alert.alert('Error', 'Problem description should not be empty');
        } else {
            const { title, message, subject } = this.state;
            this.setState({ isSaving: true });

            HttpRequest.post(URL.REPORT, { 
                message,
                title,
                subject
            })
            .then(response => {
                console.log(response);
                this.setState({ 
                    email: '', 
                    message: '',
                    title: '',
                    isSaving: false
                });
                Alert.alert('Report a Problem', 'Message submitted.');
            })
            .catch(e => {
                this.setState({ isSaving: false });
                console.log(e);
                console.log(e.response.data);
                console.log(e.response.status);
                console.log(e.response.headers);
            });
        }
    }
    
    render = () => 
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Title title={'Report a Problem'} />
                <View style={style.container}>
                    <View style={style.inputControl}>
                        <Picker
                            selectedValue={this.state.subject}
                            style={{ height: 40 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ subject: itemValue })
                            }>
                            { this.state.subjects.map((subject, index) => 
                                <Picker.Item label={subject} value={subject} key={index} />
                            )}
                        </Picker>
                    </View>

                    <TextInput 
                        value={this.state.title}
                        placeholder="Problem title" 
                        onChangeText={(text) => { this.setState({ title: text }); }} 
                        style={[style.inputControl, {
                            fontSize: 18,
                            textAlignVertical: 'top'
                        }]}
                        selectTextOnFocus={true}
                    />
                    <TextInput 
                        value={this.state.message}
                        placeholder="Elaborate the problem you've encountered." 
                        onChangeText={(text) => { this.setState({ message: text }); }} 
                        multiline
                        numberOfLines={7}
                        style={[style.inputControl, {
                            fontSize: 18,
                            textAlignVertical: 'top'
                        }]}
                        selectTextOnFocus={true}
                    />
                    <GradientButton 
                        text="Submit" style={{ marginBottom: 10 }} 
                        onPress={() => { this.submit(); }} 
                        isSaving={this.state.isSaving} 
                    />
                </View>
            </ScrollView>
        </View>
}
