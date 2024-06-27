import { Fragment, useEffect } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslationsDic } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {

    const params = useParams();
    const projectId = params.projectId!

    const navigate = useNavigate()

    /* Mostrar Modal */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const showModal = taskId ? true : false; // Si existe taskId, mostrar Modal

    const queryClient = useQueryClient();

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        retry: false,
        enabled: !!taskId
    })

    useEffect(() => {
        if(isError) {
            toast.error(error.message, {toastId: 'error'});
            return navigate(`/projects/${projectId}`);
        }
    }, [isError]);

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(response?.message)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const payload = {projectId, taskId, status}
        mutate(payload);
    }

    if(data) return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-3'>Descripción: {data.description}</p>

                                    {data.completedBy.length > 0 &&
                                        (<Disclosure>
                                            {({ open }) => (
                                                <div className='bg-slate-50 rounded-lg'>
                                                    <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-purple-100 px-2 py-2.5 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                                        <span className=' text-base'>Historial de Cambios</span>
                                                        <ChevronUpIcon
                                                        className={`${
                                                            open ? 'rotate-180 transform' : ''
                                                        } h-5 w-5 text-purple-500`}
                                                        />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="px-4 pb-4 pt-4 text-sm text-gray-800">
                                                        <ul className=''>
                                                            {data.completedBy.map(change => (
                                                                <li key={change._id}>
                                                                    <span className='font-bold text-purple-800'>{statusTranslationsDic[change.status]}</span> por: {change.user.name} - {formatDate(change.completedAt)}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </div>
                                            )}
                                        </Disclosure>)
                                    }
                                    
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: </label>

                                        <select onChange={handleChange} defaultValue={data.status} className='appearance-none w-full p-3 bg-white border rounded-none border-gray-300 '>
                                            {Object.keys(statusTranslationsDic).map((status) => (
                                                <option key={status} value={status}>{statusTranslationsDic[status]}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes}/> 
                                </Dialog.Panel>
                                
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}