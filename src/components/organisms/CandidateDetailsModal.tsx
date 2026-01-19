import { Modal } from '@/components/molecules/Modal'
import type { Candidate } from '@/types'
import { Check, Mail, Phone, MapPin, Briefcase, Building, GraduationCap, User } from 'lucide-react'
import { cn, getScoreBadgeStyles } from '@/lib/utils'

interface CandidateDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    candidate: Candidate | null
}

export function CandidateDetailsModal({ isOpen, onClose, candidate }: CandidateDetailsModalProps) {
    if (!candidate) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Kandidaatgegevens"
            className="sm:max-w-2xl"
        >
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div className="flex gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-700 font-bold text-3xl shadow-sm border border-primary-100">
                            {candidate.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {candidate.full_name}
                                {candidate.verified && (
                                    <div className="bg-green-500 text-white p-1 rounded-full shadow-sm" title="Verified Candidate">
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                )}
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">{candidate.job_title}</p>
                            <div className="flex items-center gap-2 pt-1">
                                <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-medium text-gray-600 uppercase tracking-wide">
                                    <MapPin className="w-3.5 h-3.5" /> {candidate.city}
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-medium text-gray-600 uppercase tracking-wide">
                                    {candidate.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-col items-end">
                        <div className={cn(
                            "flex flex-col items-center justify-center w-24 h-20 rounded-2xl shadow-sm border",
                            getScoreBadgeStyles(candidate.match_score).bg,
                            getScoreBadgeStyles(candidate.match_score).border
                        )}>
                            <span className={cn("text-2xl font-bold", getScoreBadgeStyles(candidate.match_score).text)}>{candidate.match_score}</span>
                            <span className={cn("text-[10px] uppercase font-bold tracking-wider", getScoreBadgeStyles(candidate.match_score).text)}>Overeenkomst</span>
                        </div>
                    </div>
                </div>

                {/* AI Analysis Card */}
                <div className="bg-gradient-to-r from-primary-50/50 to-white p-5 rounded-xl border border-primary-100/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-5">
                        <Briefcase className="w-24 h-24" />
                    </div>
                    <h3 className="text-sm font-semibold text-primary-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                        AI Analyse
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed relative z-10">
                        {candidate.feedback}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <User className="w-4 h-4 text-gray-400" />
                                Contact & Persoonlijk
                            </h3>
                            <div className="space-y-3">
                                <div className="group flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                        <Mail className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Email</span>
                                        <a href={`mailto:${candidate.email}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                                            {candidate.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                        <Phone className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Telefoon</span>
                                        <span className="font-medium text-gray-900">{candidate.contact_info.phone || <span className="text-gray-400 italic font-normal">Niet beschikbaar</span>}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <GraduationCap className="w-4 h-4 text-gray-400" />
                                Onderwijs
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed border border-gray-100">
                                {candidate.details?.education ? candidate.details.education : (
                                    <span className="text-gray-400 italic">Geen onderwijs geschiedenis beschikbaar</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <Building className="w-4 h-4 text-gray-400" />
                                Huidige Functie
                            </h3>
                            <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-900">{candidate.current_function}</p>
                                        <p className="text-sm text-gray-500">{candidate.company}</p>
                                    </div>
                                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium">
                                        {candidate.details?.years_experience || '0'} Exp
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Verantwoordelijkheden</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {candidate.details?.responsibilities || <span className="text-gray-400 italic">Geen verantwoordelijkheden geregistreerd</span>}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {candidate.details?.self_description && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <User className="w-4 h-4 text-gray-400" />
                                    Over
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-primary-200 pl-3">
                                    "{candidate.details.self_description}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
