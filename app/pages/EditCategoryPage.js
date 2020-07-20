import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { innerPageHeader } from '../components/Header';
import { URL } from '../config/url';
import { HttpRequest, HttpForm } from '../services/http';
import image from '../assets';
import style from '../styles/page.EditCategory.style';
import { USER } from '../redux/actions/types.action';

class EditCategoryPage extends Component {
    static navigationOptions = innerPageHeader('Edit Categories');
    
    constructor(props) {
        super(props);
        this.state = {
            myCategories: this.props.navigation.getParam('category'),
            categories: null,
        };
    }

    componentDidMount() {
        HttpRequest.get(URL.CATEGORY.BROWSE)
        .then(response => {
            this.setState({ categories: response.data });
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
        });
    }   

    save = () => {
        this.setState({ isSaving: true });
        const formData = new FormData();
        formData.append('myCategories', JSON.stringify(this.state.myCategories));

        HttpForm.post(URL.CATEGORY.SAVE, formData)
        .then(response => {
            this.props.dispatchGetProfile(response.data);
            this.props.navigation.navigate('Profile');
        })
        .catch(e => {
            console.log('error');
            console.log(e);
            console.log(e.response);
            console.log(e.response.data.errors);
            console.log(e.message);
            console.log(e.request);
        });
    }

    toggleCategory = category => {
        const myCategories = this.state.myCategories;
        const isExist = myCategories.find(c => c.category_id === category.category_id);
        if (isExist === undefined) {
            myCategories.push(category);
            this.setState({ myCategories });
        } else {
            const filteredCategory = myCategories.filter(c => c.category_id !== category.category_id);
            this.setState({ myCategories: filteredCategory });
        }
    }
    
    removeCategory = category => {
        const myCategories = this.state.myCategories;
        const filteredCategory = myCategories.filter(c => c.category_id !== category.category_id);
        this.setState({ myCategories: filteredCategory });
    }

    categoryList = () => 
        <View style={style.categoryListContainer}> 
            <Text style={style.allCategoryTitle}>All Categories</Text>
            { this.state.categories && this.state.categories.map((category, index) => 
                <TouchableOpacity 
                    key={index} 
                    style={style.categoryItem}
                    onPress={() => { this.toggleCategory(category); }}
                >
                    <Text style={style.categoryText}>{category.description}</Text>
                    <View style={style.checkBox}>
                        { this.state.myCategories.find(c => c.category_id === category.category_id) && 
                            <Image
                                style={style.check}
                                source={image.icon.check_radio_icon}
                            />
                        }
                    </View>
                </TouchableOpacity>
            )}
        </View>

    myCategoryList = () => 
        <View style={style.bubbleContainer}>
            { this.state.myCategories ? 
                this.state.myCategories.map((category, index) => 
                <TouchableOpacity 
                    style={style.bubble} 
                    key={index}
                    onPress={() => { this.removeCategory(category); }}
                >
                    <Text style={style.bubbleText}>{category.description}</Text>
                    <Text style={style.bubbleClose}>x</Text>
                </TouchableOpacity>
            ) : 
                <Text>Select a category below</Text>
            }
        </View>
       
    saveButton = () => 
        <TouchableOpacity 
            style={style.saveButton}
            onPress={() => { this.save(); }}
        >
            <Text style={style.saveButtonText}>Save</Text>
        </TouchableOpacity>

    render = () =>  
        <View style={{ flex: 1 }}>
            <ScrollView>
                { this.myCategoryList() }
                { this.categoryList() }
            </ScrollView>
            { this.saveButton() }
        </View>
        
    
}

const mapDispatchToProps = dispatch => ({
    dispatchGetProfile: user => dispatch({ type: USER.GET.PROFILE.SUCCESS, user }),
});

export default connect(null, mapDispatchToProps)(EditCategoryPage);