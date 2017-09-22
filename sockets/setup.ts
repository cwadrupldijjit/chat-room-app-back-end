import * as socketIo from 'socket.io';
import { securePort } from '../config/keys.config';

const socket = socketIo();

export default socket