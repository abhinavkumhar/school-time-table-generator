// Array to store subjects and teachers
let subjects = [];

// Function to add a new subject
function addSubject() {
    const subjectSelect = document.getElementById('subjectSelect');
    const teacher = document.getElementById('teacher').value;

    const subject = {
        subject: subjectSelect.value,
        teacher: teacher
    };

    subjects.push(subject);
    updateSubjectsList();
    showNotification('Subject Added Successfully');
}

// Function to update the subjects list
function updateSubjectsList() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';

    subjects.forEach((subject, index) => {
        const li = document.createElement('li');
        li.textContent = `${subject.subject} - ${subject.teacher}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeSubject(index);
        li.appendChild(removeBtn);
        subjectList.appendChild(li);
    });
}

// Function to remove a subject
function removeSubject(index) {
    subjects.splice(index, 1);
    updateSubjectsList();
    showNotification('Subject Removed Successfully');
}

// Function to generate multiple timetables
function generateTimetables() {
    const numRoutines = parseInt(document.getElementById('numRoutines').value);
    const timetableContainer = document.getElementById('timetables');
    timetableContainer.innerHTML = ''; // Clear previous timetables

    for (let i = 1; i <= numRoutines; i++) {
        const timetable = generateTimetable(i); // Generate a single timetable with routine number
        timetableContainer.appendChild(timetable);
    }

    showNotification('Timetables Generated Successfully');
}

// Function to generate a single timetable
function generateTimetable(routineNumber) {
    const schoolStartTime = document.getElementById('schoolStartTime').value;
    const schoolEndTime = document.getElementById('schoolEndTime').value;
    const classDuration = parseInt(document.getElementById('classDuration').value);
    const recessDuration = parseInt(document.getElementById('recessDuration').value);
    const periodsPerDay = parseInt(document.getElementById('periodsPerDay').value);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timetableContainer = document.createElement('div');
    timetableContainer.classList.add('timetable');

    const heading = document.createElement('h2');
    heading.textContent = `Routine ${routineNumber}`;
    timetableContainer.appendChild(heading);

    days.forEach(day => {
        const row = document.createElement('div');
        row.classList.add('timetable-row');
        row.innerHTML = `<div></br><h2>${day}</h2></div>`;

        let currentTime = schoolStartTime;
        let periodCount = 1;

        const shuffledSubjects = shuffleArray(subjects);

        for (let i = 0; i < periodsPerDay; i++) {
            const subjectIndex = i % shuffledSubjects.length;
            const subject = shuffledSubjects[subjectIndex];

            const classEndTime = addMinutes(currentTime, classDuration);
            const periodDetails = `${currentTime} - ${classEndTime} -- <strong>"${subject.subject} - ${subject.teacher}"</strong>`;
            row.innerHTML += `<div><strong>Period ${periodCount}:</strong> </br> ${periodDetails}</div>`;
            currentTime = classEndTime;
            periodCount++;

            if (periodCount % 3 === 1 && i !== periodsPerDay - 1) {
                const recessStart = currentTime;
                currentTime = addMinutes(currentTime, recessDuration);
                const recessEnd = currentTime;
                row.innerHTML += `<div style="background-color: #f2f2f2;">Recess: ${recessStart} - ${recessEnd}</div>`;
            }
        }

        timetableContainer.appendChild(row);
    });

    return timetableContainer;
}

// Helper function to add minutes to a given time
function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${padZero(newHours)}:${padZero(newMins)}`;
}

// Helper function to pad zero to a single-digit number
function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

// Helper function to shuffle an array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Helper function to show notifications
function showNotification(message) {
    const notificationArea = document.getElementById('notification');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notificationArea.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}
