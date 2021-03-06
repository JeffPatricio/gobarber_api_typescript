import { startOfHour } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository: IAppointmentsRepository;

  constructor(appointmentsRepository: IAppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    if (findAppointmentInSameDate) throw new AppError('This appointment is already booked');
    const appointment = await this.appointmentsRepository.create({ provider_id, date: appointmentDate });
    return appointment;
  }
}

export default CreateAppointmentService
