import { useEffect, useState } from 'react'

import { useErrorEffect, useUserQuery } from '@/hooks'
import { User } from '@/constants'

export function useInitFields(id: number) {
    const { data, isError, isLoading, error } = useUserQuery(id)
    const [fields, setFields] = useState<Pick<User, "name" | "email">>({ name: "", email: "" })

    const isLoadingSkeleton = isLoading || isError

    useEffect(() => {
        if (!isLoading && data) {
            setFields(data)
        }
    }, [isLoading, data])

    useErrorEffect(error)

    return { fields, setFields, isLoadingSkeleton }
}