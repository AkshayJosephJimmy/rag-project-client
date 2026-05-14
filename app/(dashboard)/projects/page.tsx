"use client"
import {useEffect, useState} from 'react';
import {useAuth} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';
import {ProjectsGrid} from '@/components/projects/ProjectsGrid';
import {CreateProjectModal} from '@/components/projects/CreateProjectModal';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/api';

interface Project{
id:string;
name:string;
description:string;
created_at:string;
clerk_id:string;


}
function ProjectsPage() {
     //data state
    const [projects,setProjects]=useState<Project[]>([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    //ui state
    const [searchQuery,setSearchQuery]=useState('')
    const [viewMode,setViewMode]=useState<'grid'|'list'>('grid')

    //model state
    const [showCreateModal,setShowCreateModal]=useState(false)
    const[isCreating,setIsCreating]=useState(false)

    const {getToken,userId}=useAuth()
    const router=useRouter()

    //business logic

    const loadProjects=async()=>{
      try{
        setLoading(true)
        const token =await getToken() 
        console.log('Token:', token) // Debugging line to check the token value
        const result=await apiClient.get('/api/projects',token)
        const {data}=result || []
        setProjects(data )
        

      }catch(err){

        console.error('Failed to load projects',err)
        toast.error('Failed to load projects')


      }finally{
        setLoading(false)
      }


    }

    const createProject= async (name:string,description:string)=>{

      try{
        setError(null)
        setIsCreating(true)
        const token=await getToken()
        
        const result= await apiClient.post('/api/projects',{name,description},token)

        const saved_project=result.data || {}

        setProjects((prev)=>[saved_project,...prev])
        setShowCreateModal(false)
        toast.success('Project created successfully')


      }catch(err){
        toast.error('Failed to create project')
        console.error('Failed to create project',err)
       

      }finally{
        setIsCreating(false)

      }


    }

    const deleteProject=async(projectId:string)=>{

      try{
        setError(null)
        const token=await getToken()
        const result= await apiClient.delete(`/api/projects/${projectId}`,token)
        setProjects((prev)=>prev.filter(p=>p.id !==projectId))
        toast.success('Project deleted successfully')
      }
      catch(err){
         toast.error('Failed to delete project')
        console.error('Failed to delete project',err)

      }finally{

      }
    }

    const handleProjectClick=(projectId:string)=>{
      router.push(`/projects/${projectId}`)
    }

    const handleOpenModal=()=>{
      setShowCreateModal(true)
    }
    const handleCloseModal=()=>{
      setShowCreateModal(false)
    }

    useEffect(()=>{
      loadProjects()
    },[userId])

    if(loading){
      return(
        <LoadingSpinner message="Loading projects..."  />
      )
    }
    const filteredProjects=projects.filter((project)=>
     project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     project.description.toLowerCase().includes(searchQuery.toLowerCase()))


  return (
    <div className="w-full">
      <ProjectsGrid projects={filteredProjects}
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onProjectClick={handleProjectClick}
      onDeleteProject={deleteProject}
      onCreateProject={handleOpenModal}>

      </ProjectsGrid>
      <CreateProjectModal isOpen={showCreateModal} onClose={handleCloseModal} onCreateProject={createProject} isLoading={isCreating}/>
      
    </div>
  );
}

export default ProjectsPage;