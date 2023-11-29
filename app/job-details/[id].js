import React, { useState, useCallback } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'

import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
  const params = useGlobalSearchParams(); 
  // gets the id of the job details page

  const router = useRouter();
  const[refreshing, setRefreshing] = useState(false)
  const[activeTab, setActiveTab] = useState(tabs[0])

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id
  })

  const displayTabContent = () => {
    switch(activeTab) {
      case "Qualifications":
        return <Specifics
          title="Qualifications"
          points={data?.data?.data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case "About":
        return <JobAbout
          info={data?.data?.data[0].job_description ?? 'No Data'}
        />
      case "Responsibilities":
        return <Specifics
          title="Responsibilities"
          points={data?.data?.data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      default: break;
    }
  }

  return (
    <SafeAreaView  // make sure all part of the page is visible
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension="60%"
            handlePress={() => router.back()}
          />
        ),
        headerRight: () => (
          <ScreenHeaderBtn
            iconUrl={icons.share}
            dimension="60%"
          />
        ),
        headerTitle: ''
      }}/>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
            { isLoading ? 
              <ActivityIndicator size='large' color={COLORS.primary}/>
              : error ?
              <Text>Something Went Wrong</Text>
              : data.length === 0 ? 
              <Text>No data</Text>
              :
              <View style={{padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data?.data?.data[0]?.employer_logo}
                  jobTitle={data?.data?.data[0]?.job_title}
                  companyName={data?.data?.data[0]?.employer_name}
                  location={data?.data?.data[0]?.job_country}
                />
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                { displayTabContent() }
              </View>
            }
        </ScrollView>

        <JobFooter url={data?.data?.data[0].job_google_link ?? 'https://careers.google.com/jobs/results'}/>
      </>
    </SafeAreaView>
  )
}

export default JobDetails