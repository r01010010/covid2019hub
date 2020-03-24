// import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import './styles/base.scss';
// import Button from './components/atoms/form/Button.jsx';
// import TextField from './components/atoms/form/TextField.jsx';
// import t from '../src/language/langEngine';
// import users from './state/actions/users';

// // IMGS
// import players1 from './styles/svg/youtube.svg';
// import players2 from './styles/svg/016-medal-4.svg';
// import players3 from './styles/svg/check.svg';
// import players4 from './styles/svg/011-shirt-1.svg';
// import invest1 from './styles/svg/graph-3.svg';
// import invest2 from './styles/svg/receipt.svg';
// import invest3 from './styles/svg/justice-scale.svg';
// import clubs1 from './styles/svg/026-strategy-1.svg';
// import clubs2 from './styles/svg/investment.svg';
// // import basket from '../styles/svg/basketball.svg';

// const isEmail = (email) => {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email.toLowerCase());
// }

// function ScrollToResolver(elem) {
//   var jump = parseInt(elem.getBoundingClientRect().top * .2);
//   document.body.scrollTop += jump;
//   document.documentElement.scrollTop += jump;
//   if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
//     elem.lastjump = Math.abs(jump);
//     setTimeout(function() { ScrollToResolver(elem);}, "75");
//   } else {
//     elem.lastjump = null;
//   }
// }

// function getSubdomain() {
//   const full = window.location.host
//   const parts = full.split('.')
//   const sub = parts[0];
//   const result = (sub === 'basket') ? 'basket' : 'football';
//   return result;
// }

// function getLanguage() {
//   const lang = navigator.language || navigator.userLanguage;
//   return lang;
// }

// class App extends Component {
//   constructor(options) {
//     super(options);
//     this.state = {
//       name: '',
//       email: '',
//       role: '',
//       errors: {},
//       registered: false,
//       lang: 'es_es',
//       theme: getSubdomain(),
//     }

//     this.onSelectRole = this.onSelectRole.bind(this);
//     this.onChangeInput = this.onChangeInput.bind(this);
//     this.createUser = this.createUser.bind(this);
//     this.onRegisterClick = this.onRegisterClick.bind(this);
//     this.onMenuClick = this.onMenuClick.bind(this);
//     this.switchToLang = this.switchToLang.bind(this);
//   }

//   validateForm() {
//     const { name, email, role } = this.state;
//     const errors = {};
//     if (_.isEmpty(role)) errors.role = t.say('errors', 'role');
//     if (_.isEmpty(name)) errors.name = t.say('errors', 'name');;
//     if (_.isEmpty(email) || !isEmail(email)) errors.email = t.say('errors', 'email');;

//     this.setState({errors});

//     return _.isEmpty(errors);
//   }

//   onSelectRole(e) {
//     this.setState({
//       role: e.target.value
//     });
//   }

//   onChangeInput(value, e) {
//     this.setState({
//       [e.target.name]: value
//     });
//   }

//   createUser() {
//     if (this.validateForm()) {
//       const { dispatch } = this.props;
//       const user = this.state;

//       users.create(user, dispatch);
//       this.setState({ registered: true });
//     }
//   }

//   onRegisterClick() {
//     // document.body.scrollIntoView(false);
//     // window.location.hash = '#bottom';
//     ScrollToResolver(document.getElementById('bottom'));
//     console.log('Go to bottom');
//   }

//   onMenuClick(e) {
//     ScrollToResolver(document.getElementById(e.target.getAttribute('goto')));
//   }

//   switchToLang(lang) {
//     this.setState({'lang': lang});
//     t.switchTo(lang);
//     this.forceUpdate();
//   }

//   render() {
//     const { errors, registered } = this.state;
//     const errRole = (errors.role) ? <div>{ errors.role }</div> : '';
//     const errName = (errors.name) ? <div>{ errors.name }</div> : '';
//     const errEmail = (errors.email) ? <div>{ errors.email}</div> : '';

//     const bgClass = `presentation-background-${this.state.theme}`;
//     const errorsContainer = (_.isEmpty(this.state.errors)) ? '' :
//       (<div className="errors-container">
//         { errRole }
//         { errName }
//         { errEmail }
//       </div>);

//     const form = (registered) ?
//       (<div className={['section-left signupok-container']}>
//         <div className="title">🎉 {t.say('signupok', 'congrats')}</div>
//         <div className="subtitle-1">{t.say('signupok', 'in-the-team')}</div>
//         <div className="paragraph">{t.say('signupok', 'paragraph')}</div>
//         <div className="button-container">
//           <br />
//           <div>Email: &nbsp; <a href="videos@mvphunter.es">videos@mvphunter.es</a></div>
//           <br />
//           <div>Whatsapp: &nbsp; <a href="whatsapp://send?phone=34655365886">+34 655 365 886</a></div>
//           {/* <Button onClick={ this.createUser } text={t.say('buttons', 'signup-0')} enabled={ true } /> */}
//         </div>
//       </div>)
//       :
//       (<div className={['section-left']}>
//         <div className="title">{t.say('titles', 'signup')}</div>
//         <div className="subtitle-1">{t.say('slogans', 'world-wants-see-you')}</div>
//         {/* <div className="paragraph">{t.say('paragraphs', 'players')}</div> */}
//         (<div className="section-right">
//           <div className="radios-container">
//            <label className="radio-container">{ t.say('roles', 'player') }
//              <input onClick={ this.onSelectRole } type="radio" name="role" value="player" />
//              <span className="checkmark"></span>
//            </label>
//            <label className="radio-container">{ t.say('roles', 'broker') }
//              <input onClick={ this.onSelectRole } type="radio" name="role" value="broker" />
//              <span className="checkmark"></span>
//            </label>
//            <label className="radio-container">{ t.say('roles', 'club') }
//              <input onClick={ this.onSelectRole } type="radio" name="role" value="club" />
//              <span className="checkmark"></span>
//            </label>
//           </div>

//           <TextField
//            type="text"
//            name="name"
//            onChange={this.onChangeInput}
//            classes={['signup-input']}
//            placeholder={t.say('placeholders', 'name')} />
//           <br />
//           <TextField
//            type="email"
//            name="email"
//            onChange={this.onChangeInput}
//            classes={['signup-input']}
//            placeholder={t.say('placeholders', 'email')} />
//            <br />
//            { errorsContainer }
//            <div className="button-container only-mobile">
//              <Button onClick={ this.createUser } text={t.say('buttons', 'signup-0')} enabled={ true } />
//            </div>
//         </div>)
//         <div className="button-container no-mobile">
//           <Button onClick={ this.createUser } text={t.say('buttons', 'signup-0')} enabled={ true } />
//         </div>
//       </div>)

//     return (
//       <div className="main">
//           JODERRRRRRRRR
//         <div id="presentation">
//           <div id="presentation-background" className={bgClass}></div>
//           <header id="menu">
//             <div className="section-left">
//               <div className="menu-item first">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
//               <a onClick={ this.onMenuClick } className="menu-item" goto="players">{t.say('menu', 'players')}</a>
//               <a onClick={ this.onMenuClick } className="menu-item" goto="invest">{t.say('menu', 'invest')}</a>
//               <a onClick={ this.onMenuClick } className="menu-item" goto="clubs">{t.say('menu', 'clubs')}</a>
//             </div>
//             <div className="section-right">
//               <span className="ball">
//                 <img src="/assets/emojis/football-trans.png" />
//               </span>
//               <span className="ball">
//                 <img src="/assets/emojis/basketball-trans.png" />
//               </span>
//               <span className="flag" style={{fontSize: 40}} onClick={()=>{ this.switchToLang('en_en'); }}>
//                 <img src="https://image.flaticon.com/icons/svg/555/555417.svg" width="40"/>
//               </span>
//               <span className="flag" style={{fontSize: 40}} onClick={()=>{ this.switchToLang('es_es'); }}>
//                 <img src="https://image.flaticon.com/icons/svg/555/555635.svg" width="40"/>
//               </span>
//             </div>
//           </header>
//           <div id="presentation-content">
//             <div className="logo"></div>
//             <div className="logo-name only-mobile">MVP HUNTER</div>
//             <div className="subtitle">{ t.sayByTheme('titles', 'do-you-have-talent', this.state.theme)}</div>
//             {/* <div className="subtitle">{ t.say('titles', 'show-it')}</div> */}
//             <div style={{
//               paddingTop: 20
//             }}>
//               <a href="https://play.google.com/store/apps/details?id=com.mvphunter"><img src="/assets/images/bt-android.png" className="btapp" style={{ marginRight: 15 }}/></a>
//               <a onClick={ this.onRegisterClick }><img src="/assets/images/bt-ios.png" className="btapp" /></a>
//             </div>
//             {/* <img src="http://alchemists.dan-fisher.com/images/logo-football.png" /> */}
//             <div className="signup-form-container">
//               {/* <div>
//                 <TextField
//                   type="email"
//                   name="email"
//                   onChange={this.onChangeInput}
//                   classes={['signup-input']}
//                   placeholder={t.say('placeholders', 'email')}
//                 />
//               </div> */}
//               <div className="presentation-button-container">
//                 <Button onClick={ this.onRegisterClick } classes={['button-transparent', 'big-button']} text={t.say('buttons', 'signup-0')} enabled={ true } />
//               </div>
//             </div>
//           </div>
//           <div style={{
//             position: 'absolute',
//             bottom: 15,
//             height: '30',
//             // right: 15
//           }}>
//             <a
//               alt='Creative Commons Cléria de Souza'
//               href='https://creativecommons.org/licenses/by/2.0/deed.en'
//               style={{
//                 fontSize: 11,
//                 textDecoration: 'none',
//                 color: 'rgb(194, 255, 31)',
//                 opacity: 0.3
//               }}> © Etihad Stadium from Cléria De Souza</a>
//           </div>
//         </div>

//         <div id="how-it-works" className="section">
//           <div className="section-top">
//             <div className="title">{t.say('titles', 'how-it-works')}</div>
//             <div className="paragraph">{t.say('paragraphs', 'how-it-works')}</div>
//           </div>
//           <div className="section-bottom">
//             <div className="card">
//               <div className="card-icon">
//                 <FontAwesome
//                   name='youtube'
//                   size='4x'
//                   style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//                 </div>
//               <div className="card-title">{t.say('titles', 'upload-videos')}</div>
//               <div className="card-paragraph no-mobile">
//                 {t.say('paragraphs', 'upload-videos')}
//               </div>
//             </div>

//             <div className="card">
//               <div className="card-icon">
//                 <FontAwesome
//                   name='star'
//                   size='4x'
//                   style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//                 </div>
//               <div className="card-title">{t.say('titles', 'get-notorious')}</div>
//               <div className="card-paragraph no-mobile">
//                 {t.say('paragraphs', 'get-notorious')}
//               </div>
//             </div>

//             <div className="card">
//               <div className="card-icon">
//                 <FontAwesome
//                   name='handshake-o'
//                   size='4x'
//                   style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//                 </div>
//               <div className="card-title">{t.say('titles', 'get-hired')}</div>
//               <div className="card-paragraph no-mobile">
//                 {t.say('paragraphs', 'get-hired')}
//               </div>
//             </div>

//           </div>
//         </div>

//         <div id="players" className={['section']}>
//           <div className={['section-left']}>
//             <div className="title">{t.say('titles', 'players')}</div>
//             {/* <div className="title" style={{fontSize: 20, fontStyle: 'italic', color: '#fff'}}>{t.say('subtitles', 'family-and-co')}</div> */}
//             <div className="subtitle-1" style={{ maxWidth: 400 }}>{t.sayByTheme('subtitles', 'do-you-have-talent', this.state.theme)}</div>
//             {/* <div className="paragraph">{t.say('paragraphs', 'players')}</div> */}
//             <div className="mvph-list">
//               <div className="mvph-list-item">
//                 <div className="star" style={{ alignSelf: 'flex-start'}}>
//                   <img className="white" src={players1} width="50" height="50"/>
//                 </div>
//                 <div className='list-item-text' style={{ display: 'flex', flexDirection: 'column'}}>
//                   <div>
//                     <div style={{ marginBottom: '20px'}}>{t.say('paragraphs', 'players-list-1')}</div>
//                     <div style={{ paddingLeft: '15px', marginBottom: '10px', fontStyle: 'italic'}}>- &nbsp;{t.say('videos', 'abilities')}</div>
//                     <div style={{ paddingLeft: '15px', marginBottom: '10px', fontStyle: 'italic'}}>- &nbsp;{t.sayByTheme('videos', 'shoots', this.state.theme)}</div>
//                     <div style={{ paddingLeft: '15px', fontStyle: 'italic'}}>- &nbsp;{t.say('videos', 'moves')}</div>
//                   </div>
//                 </div>

//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img className="white" src={players2} width="50" height="50"/>
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'players-list-2')}</div>
//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img className="white" src={players3} width="50" height="50"/>
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'players-list-3')}</div>
//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img className="white" src={players4} width="50" height="50"/>
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'players-list-4')}</div>
//               </div>
//             </div>
//             <div className="button-container">
//               <Button onClick={ this.onRegisterClick } text={t.say('buttons', 'signup-0')} enabled={ true } />
//             </div>
//           </div>
//           <div className="section-right section-icon-right no-mobile">
//             <FontAwesome
//               name='soccer-ball-o'
//               size='9x'
//               style={{ fontSize: 350, opacity: 0.3, color: 'white', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//           </div>
//         </div>

//         <div id="invest" className={['section']}>
//           <div className="section-left section-icon-left no-mobile">
//             <div>
//               <FontAwesome
//                 name='line-chart'
//                 size='9x'
//                 style={{ fontSize: 400, opacity: 0.3, color: 'white', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//             </div>
//           </div>
//           <div className={['section-right']}>
//             <div className="title font-noir">{t.say('titles', 'invest')}</div>
//             {/* <div className="subtitle-1 font-noir">{t.say('subtitles', 'pros-and-no-pros')}</div> */}
//             <div className="subtitle-1 font-noir">{t.say('paragraphs', 'invest-1-b')}</div>
//             <div className="mvph-list">
//               <div className="mvph-list-item">
//                 <div className="star">
//                 <img src={invest1} width="50" height="50" />
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'invest-list-1')}</div>
//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img src={invest2} width="50" height="50" />
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'invest-list-2')}</div>
//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img src={invest3} width="50" height="50" />
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'invest-list-3')}</div>
//               </div>
//             </div>
//             <div className="button-container">
//               <Button onClick={ this.onRegisterClick } text={t.say('buttons', 'signup-0')} enabled={ true } />
//             </div>
//           </div>
//         </div>

//         <div id="clubs" className={['section']}>
//           <div className="section-left">
//             <div className="title font-noir">{t.say('titles', 'clubs')}</div>
//             <div className="subtitle-1 font-noir">{t.say('paragraphs', 'clubs')}</div>
//             {/* <div className="paragraph font-noir">{t.say('paragraphs', 'clubs')}</div> */}
//             <div className="mvph-list">
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img src={clubs1} alt={'logo'} width="50" height="50" />
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'clubs-list-1')}</div>
//               </div>
//               <div className="mvph-list-item">
//                 <div className="star">
//                   <img src={clubs2} alt={'logo'} width="50" height="50" />
//                 </div>
//                 <div className='list-item-text'>{t.say('paragraphs', 'clubs-list-2')}</div>
//               </div>
//             </div>
//             <div className="button-container">
//               <Button onClick={ this.onRegisterClick } text={t.say('buttons', 'signup-0')} enabled={ true } />
//             </div>
//           </div>
//           <div className="section-right section-icon-right no-mobile">
//             <FontAwesome
//               name='rocket'
//               size='9x'
//               style={{ fontSize: 500, opacity: 0.3, color: 'white', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//           </div>
//         </div>

//         <div id="signup" className={['section']}>
//           { form }
//         </div>
//         <div id="bottom">a</div>
//         {/* <div className="mail_main">
//           <FontAwesome
//             name='trophy'
//             size='3x'
//             style={{ fontSize: 200, opacity: 0.3, color: 'white', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
//           <div className="title">🎉 Enhorabuena!</div>
//           <div className="subtitle">Bienvenido a MVP Hunter! </div>
//           <div className="body">
//             Ya puedes empezar a subir tus videos para mostrar al mundo tu talento.
//             <br />
//             <br />
//             Es muy facil, puedes enviarlos tanto por email al <a href="videos@mvphunter.es">videos@mvphunter.es</a> como por whatsapp <a href="whatsapp://send?phone=34655365886">+34 655 365 886</a> indicando tu edad y el correo electronico con
//             el que te has registrado.
//             <br />
//             <br />
//             Recuerda invitar a tus amigos para que puedan votar,
//             compartir tus videos y conseguir ser uno de los deporistas mas valorados del ranking.
//             <br />
//             <br />
//             Un saludo del equipo de MVP Hunter.
//           </div>
//         </div> */}
//       </div>
//     );
//   }
// }

// export default connect()(App);
