import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  const appointment = await createAppointment.execute({ date: parsedDate, provider_id });
  return response.json({ success: true, appointment });
});

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json({ success: true, appointments });
// });

export default appointmentsRouter;
