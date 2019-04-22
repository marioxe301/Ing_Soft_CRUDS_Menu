import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const APIURL = 'https://localhost:5001/api/user';

const styles = theme => ({
    root: {
      width: '70%',
      marginTop: theme.spacing.unit * 3,
      marginLeft: 200,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    button:{
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
  });

class TablaUsuarios extends Component{
    constructor(props){
        super(props);
        this.state={
            usuarios: [],
            open1: false,
            open2: false,
            open3: false,
            usuariosN:'',
            usuariosE: 0,
            usuariosS: 'M',
            refN: 0,
        };
    }

    handleOpen1=()=>{
        this.setState({open1: true});
    }

    handleOpen2=()=>{
        this.setState({open2: true});
    }

    handleOpen3=()=>{
        this.setState({open3: true});
    }

    handleClose1=()=>{
        this.setState({open1: false});
        let id = this.state.usuarios.length +1;
        Axios.post(APIURL+'?id='+id+'&name='+this.state.usuariosN+'&age='+this.state.usuariosE+'&sex='+this.state.usuariosS);
        this.setState({
            usuariosE: 0,
            usuariosN: '',
            usuariosS: 'M',
        })
    }

    handleClose2=()=>{
        this.setState({open2: false});
        Axios.delete(APIURL+'/'+this.state.refN);
    }

    handleClose3=()=>{
        this.setState({open3: false});

        Axios.put(APIURL+'/'+this.state.refN+'?name='+this.state.usuariosN+'&age='+this.state.usuariosE+'&sex='+this.state.usuariosS)
        this.setState({
            usuariosE: 0,
            usuariosN: '',
            usuariosS: 'M',
        })
    }

    componentDidMount(){
        fetch(APIURL).then(res=>res.json()).then(data => this.setState({usuarios: data}));
    }



    componentWillUpdate(){
        fetch(APIURL).then(res=>res.json()).then(data => this.setState({usuarios: data}));
    }

    Listar=(classes)=>{
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Edad</TableCell>
                            <TableCell align="center">Sexo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.usuarios.map( usu=>(
                            <TableRow key={usu.id}>
                                <TableCell component="th" scope="row">
                                    {usu.name}
                                </TableCell>
                                <TableCell align="center">{usu.age}</TableCell>
                                <TableCell align="center">{usu.sex}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    handleChange=(Name,event)=>{
        this.setState({ [Name]: event.target.value });
    }

    render(){
        const {classes} = this.props;
        return(
        <div>
            <div>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen1}>
                    Agregar
                    </Button>

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen2}>
                    Eliminar
                    </Button>

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleOpen3}>
                    Editar
                    </Button>
            </div>

            <div className="Dialogs">
                <Dialog
                    open={this.state.open1}
                    onClose={this.handleClose1}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle>Agregar</DialogTitle>
                <DialogContent>

                    <TextField
                        label="Nombre"
                        className={classes.textField}
                        value={this.state.usuariosN}
                        onChange={this.handleChange.bind(this,'usuariosN')}
                    />
                    <br/>
                    <TextField
                        label="Edad"
                        className={classes.textField}
                        value={this.state.usuariosE}
                        onChange={this.handleChange.bind(this,'usuariosE')}
                        />
                    <br/>
                    <TextField
                        label="Sexo(M o F)"
                        className={classes.textField}
                        value={this.state.usuariosS}
                        onChange={this.handleChange.bind(this,'usuariosS')}
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose1} color="primary">Agregar</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open2}
                    onClose={this.handleClose2}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle>Eliminar</DialogTitle>
                    <DialogContent>
                        <Select
                            value={this.state.refN}
                            onChange={this.handleChange.bind(this,'refN')}
                        >
                        {this.state.usuarios.map(usu=>(
                            <MenuItem value={usu.id}>
                            {usu.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose2} color="primary">Eliminar</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open3}
                    onClose={this.handleClose3}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle>Editar</DialogTitle>
                    <DialogContent>
                        <Select
                            value={this.state.refN}
                            onChange={this.handleChange.bind(this,'refN')}
                        >
                        {this.state.usuarios.map(usu=>(
                            <MenuItem value={usu.id}>
                            {usu.name}
                            </MenuItem>
                        ))}
                        </Select>
                        <br/>
                        <TextField
                        label="Nombre"
                        className={classes.textField}
                        value={this.state.usuariosN}
                        onChange={this.handleChange.bind(this,'usuariosN')}
                         />
                    <br/>
                        <TextField
                        label="Edad"
                        className={classes.textField}
                        value={this.state.usuariosE}
                        onChange={this.handleChange.bind(this,'usuariosE')}
                        />
                    <br/>
                        <TextField
                        label="Sexo(M o F)"
                        className={classes.textField}
                        value={this.state.usuariosS}
                        onChange={this.handleChange.bind(this,'usuariosS')}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose3} color="primary">Editar</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {this.Listar(classes)}
            
        </div>
        );
    }
}

export default withStyles(styles)(TablaUsuarios);